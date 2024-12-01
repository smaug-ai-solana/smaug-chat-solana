import { useState, useRef, useEffect } from "react";
import CustomInput from "../customInput/customInput";
import "./Chat.css";
import { useToast } from "../../hooks/use-toast";
import api from "../../services/api";
import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import Pusher from "pusher-js";
import {
  PublicKey,
  Transaction,
  Connection,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
interface Message {
  id: number;
  content: string;
  walletAddress: "ai" | any;
}

const Chat = ({
  refetchStats,
  messageFee,
}: {
  refetchStats: () => void;
  messageFee: number;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { wallets } = useSolanaWallets();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = usePrivy();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/messages");
        const serverMessages = response.data.map((msg: any, index: number) => ({
          id: index + 1,
          content: msg.content,
          walletAddress: msg.privyId === "ai" ? "ai" : user?.wallet.address,
        }));
        setMessages(serverMessages);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load message history",
          type: "error",
        });
      }
    };

    fetchMessages();
  }, [user?.wallet.address, toast]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isFocused]);

  useEffect(() => {
    const pusher = new Pusher("ebd40ca3852f0a885bf8", {
      cluster: "eu",
    });

    // Always subscribe to world chat
    const worldChannel = pusher.subscribe("chat");
    console.log(worldChannel);
    worldChannel.bind("message", handleNewMessage);

    return () => {
      worldChannel.unbind_all();
      worldChannel.unsubscribe();
    };
  }, []);

  const handleNewMessage = (data: any) => {
    setMessages((prevMessages) => [...prevMessages, data]);
    refetchStats();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatContainerRef.current &&
      !chatContainerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    setInputValue("");

    try {
      const response = await api.post("/message", {
        content: inputValue,
        walletAddress: user?.wallet.address,
      });

      if (!response.data.success) {
        toast({
          title: "Error",
          description: "Failed to send message.",
          type: "error",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message.",
        type: "error",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSubmit = async () => {
    refetchStats();
    try {
      const solanaWallet = wallets[0];

      if (!solanaWallet) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please connect your Solana wallet first",
        });
        return;
      }

      // Send transaction request to backend
      const response = await api.post("/create-transaction", {
        senderAddress: solanaWallet.address,
        amount: Number(messageFee.toFixed(4)) * LAMPORTS_PER_SOL,
      });

      const transaction = Transaction.from(
        Buffer.from(response.data.serializedTransaction, "base64")
      );

      // Send and confirm transaction
      const signature = await solanaWallet.sendTransaction!(
        transaction,
        // Use public RPC endpoint for client-side confirmation
        new Connection("https://api.mainnet-beta.solana.com", "confirmed")
      );

      // Wait for confirmation
      console.log("Transaction sent and confirmed:", signature);
      sendMessage();
    } catch (error: any) {
      console.error("Transaction failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create agent",
      });
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className={`chat-container ${isFocused ? "expanded" : "collapsed"}`}
    >
      <div
        ref={chatMessagesRef}
        className={`chat-messages ${isFocused ? "visible" : "hidden"}`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.walletAddress === "ai" ? "bot" : "user"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <CustomInput
          onFocus={handleFocus}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSubmit}
          onKeyDown={handleKeyDown}
          isExpanded={isFocused}
        />
      </div>
    </div>
  );
};

export default Chat;
