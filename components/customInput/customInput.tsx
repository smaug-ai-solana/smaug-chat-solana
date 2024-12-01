import { MessageCircleIcon, SendIcon } from "lucide-react";
import "./customInput.css";
import { Color } from "three";

interface CustomInputProps {
  onFocus: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isExpanded: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  onFocus,
  value,
  onChange,
  onSend,
  onKeyDown,
  isExpanded,
}) => {
  return (
    <>
      <div className="galaxy"></div>
      <div id="search-container">
        <div className="nebula"></div>
        <div className="starfield"></div>
        <div className="cosmic-dust"></div>
        <div className="cosmic-dust"></div>
        <div className="cosmic-dust"></div>

        <div className="stardust"></div>

        <div className="cosmic-ring"></div>

        <div id="main">
          <input
            className={`input ${isExpanded ? "expanded" : ""}`}
            name="text"
            type="text"
            placeholder="Press Enter to send"
            onFocus={onFocus}
            autoComplete="off"
            spellCheck={false}
            autoCorrect="off"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <div id="input-mask"></div>
          <div id="cosmic-glow"></div>
          <div className="wormhole-border"></div>
          <div
            id="wormhole-icon"
            onClick={onSend}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSend();
              }
            }}
          >
            <SendIcon color="#a9c7ff" />
          </div>
          <div id="search-icon">
            <MessageCircleIcon color="#a9c7ff" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomInput;
