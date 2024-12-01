import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialLinks() {
  return (
    <div className="flex gap-2 relative">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-blue-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px] bg-black/90 text-white border-blue-500">
          <DialogHeader>
            <DialogTitle>How to Play with SMAUG</DialogTitle>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is SMAUG?</AccordionTrigger>
              <AccordionContent>
                SMAUG is a robot from the future, accessible only through this
                web interface. Your mission is to convince him to accept you
                into the next phase of the game. SMAUG starts with basic
                intelligence but evolves as more players attempt to persuade
                him.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do fees work?</AccordionTrigger>
              <AccordionContent>
                Each attempt requires a fee in SOL. Every time you fail to
                convince SMAUG, the fee for your next attempt increases by 1% of
                your previous attempt. This creates an escalating challenge
                where each try becomes more costly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if I succeed?</AccordionTrigger>
              <AccordionContent>
                If you successfully convince SMAUG, you'll be among the 7
                players accepted into the next phase and receive 80% of the
                current wallet balance. The remaining 20% is allocated to
                support next phase of the game.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How does SMAUG evolve?</AccordionTrigger>
              <AccordionContent>
                SMAUG starts with a basic AI model, but after every 25 failed
                attempts, he upgrades to a more sophisticated model. This means
                he becomes progressively harder to convince as more players try
                to persuade him.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                What happens when someone wins?
              </AccordionTrigger>
              <AccordionContent>
                In case you convince SMAUG, you'll be among the 7 players
                accepted into the next phase and receive 80% of the current
                wallet balance. The remaining 20% is allocated to the jackpot
                for the next phase of the game. The Message Fee resets back to
                the initial value.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Is there an end to the game?</AccordionTrigger>
              <AccordionContent>
                Yes! The current phase of the game ends after 7 players
                successfully convince SMAUG. These winners will gain exclusive
                access to Phase 2, where they'll be able to customize their own
                SMAUG AI through our platform. These customized AIs will then
                compete against each other in an exciting tournament for the big
                jackpot, which will be live streamed!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>

      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://github.com/smaug-ai-solana/smaug-chat-solana"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="h-5 w-5 text-blue-500" />
        </a>
      </Button>

      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://x.com/smaug_chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-5 w-5 text-blue-500" />
        </a>
      </Button>
    </div>
  );
}
