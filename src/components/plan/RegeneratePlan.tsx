import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { RefreshCcw } from "lucide-react";

const RegeneratePlan = ({ position }: { position: 'top' | 'bottom' }) => {
  const { generatePlan } = useAuth();
  const [isRegenerating, setIsRegenerating] = useState(false);

  return (
    <Button
      variant="secondary"
      className={`gap-2 ${position === 'top' ? 'max-md:hidden' : 'md:hidden w-full'}`}
      disabled={isRegenerating}
      onClick={async () => {
        setIsRegenerating(true);
        try {
          await generatePlan();
        } finally {
          setIsRegenerating(false);
        }
      }}
    >
      <RefreshCcw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
      {isRegenerating ? "Regenerating..." : "Regenerate Plan"}
    </Button>
  )
}

export default RegeneratePlan