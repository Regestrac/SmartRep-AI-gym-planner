import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import React, { useState } from "react";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { daysOptions, equipmentOptions, experienceOptions, goalOptions, sessionOptions, splitOptions } from "../helpers/constants";

type FormDataType = {
  goal: string;
  experience: string;
  daysPerWeek: string;
  sessionLength: string;
  equipment: string;
  injuries: string;
  preferredSplit: string;
};

const Onboarding = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<FormDataType>({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });

  const updateForm = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionnaire = async (e: React.SubmitEvent) => {
    e.preventDefault();
    
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {/* Progress Indicator */}

          {/* Step 1: Questionnaire */}
          <Card variant="bordered">
            <h1 className="text-2xl font-bold mb-2">Tell Us About You</h1>
            <p className="text-muted mb-6">Help us create the best plan for you.</p>
            <form className="space-y-5" onSubmit={handleQuestionnaire}>
              <Select
                id="goal"
                label="What's your primary goal?"
                options={goalOptions}
                value={formData.goal}
                onChange={(e) => updateForm("goal", e.target.value)}
              />
              <Select
                id="experience"
                label="Training experience"
                options={experienceOptions}
                value={formData.experience}
                onChange={(e) => updateForm("experience", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  id="daysPerWeek"
                  label="Days per week"
                  options={daysOptions}
                  value={formData.daysPerWeek}
                  onChange={(e) => updateForm("daysPerWeek", e.target.value)}
                />
                <Select
                  id="sessionLength"
                  label="Session length"
                  options={sessionOptions}
                  value={formData.sessionLength}
                  onChange={(e) =>
                    updateForm("sessionLength", e.target.value)
                  }
                />
              </div>
              <Select
                id="equipment"
                label="Equipment access"
                options={equipmentOptions}
                value={formData.equipment}
                onChange={(e) => updateForm("equipment", e.target.value)}
              />

              <Select
                id="preferredSplit"
                label="Preferred training split"
                options={splitOptions}
                value={formData.preferredSplit}
                onChange={(e) => updateForm("preferredSplit", e.target.value)}
              />

              <Textarea
                id="injuries"
                label="Any injuries or limitations? (optional)"
                placeholder="E.g., lower back issues, shoulder impingement..."
                rows={3}
                value={formData.injuries}
                onChange={(e) => updateForm("injuries", e.target.value)}
              />

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 gap-2">
                  Generate My Plan <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>
          {/* Step 2: Generating */}
        </div>
      </div>
    </SignedIn>
  )
}

export default Onboarding
