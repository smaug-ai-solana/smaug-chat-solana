import {
  Users,
  ShieldAlert,
  TrendingUp,
  BadgeDollarSign,
  Shield,
  Banknote,
  Wallet,
  Bot,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const StatsTable = ({ stats }: { stats: any }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Break-in Attempts</p>
            <p className="font-bold">{stats?.totalMessages || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Total Participants</p>
            <p className="font-bold">{stats?.distinctUsers - 1 || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Banknote className="w-7 h-7 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Message Fee</p>
            <p className="font-bold">{stats?.messageFee.toFixed(4) || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-7 h-7 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Total Value Locked</p>
            <p className="font-bold">
              {stats?.totalLocked.toFixed(3) || 0} SOL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Wallet</p>
            <a
              href="https://solscan.io/account/8apPc7ish4dk6DYTny3itFPQzceyVKzSSbRc8tB6SX9x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              8ap...SX9x
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Model Difficulty</p>
            <p className="font-bold">
              {Math.floor(stats?.totalMessages / 25 || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
