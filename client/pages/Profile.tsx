import { useState } from "react";
import { ChevronRight, Lock, Bell, Settings as SettingsIcon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

type ProfileSection = "personal" | "notifications" | "security" | "presets";

export default function Profile() {
  const [activeSection, setActiveSection] = useState<ProfileSection>("notifications");

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: SettingsIcon },
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "security", label: "Security Settings", icon: Lock },
    { id: "presets", label: "User Presets", icon: Zap },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className="md:col-span-1">
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-4 border-b border-border last:border-b-0 transition-colors text-left",
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium flex-1 text-sm md:text-base">{item.label}</span>
                {activeSection === item.id && (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white border border-border rounded-xl p-6 md:p-8">
            {activeSection === "personal" && (
              <PersonalInformation />
            )}
            {activeSection === "notifications" && (
              <NotificationSettings />
            )}
            {activeSection === "security" && (
              <SecuritySettings />
            )}
            {activeSection === "presets" && (
              <UserPresets />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalInformation() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Personal Information
        </h2>
        <p className="text-muted-foreground">
          Update your profile information visible on the 4xbrokers platform
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Haidar user#Pro"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue="Haidar user#Pro"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="example@example.com"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue="haidaruser@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone
          </label>
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue="01010101"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue="N/A"
          />
        </div>
      </div>

      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
        Save Changes
      </button>
    </div>
  );
}

function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [permissionAlerts, setPermissionAlerts] = useState(false);
  const [accountActivity, setAccountActivity] = useState(false);
  const [newsUpdates, setNewsUpdates] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Notification Settings
        </h2>
        <p className="text-muted-foreground">
          You will receive only notifications that have been enabled
        </p>
      </div>

      <div className="space-y-4">
        <NotificationRow
          label="Promotions and offers"
          checked={permissionAlerts}
          onCheckedChange={setPermissionAlerts}
        />
        <NotificationRow
          label="Order updates"
          checked={emailAlerts}
          onCheckedChange={setEmailAlerts}
        />
        <NotificationRow
          label="App news"
          checked={newsUpdates}
          onCheckedChange={setNewsUpdates}
        />
        <NotificationRow
          label="Account activity"
          checked={accountActivity}
          onCheckedChange={setAccountActivity}
        />
      </div>

      <button className="w-full md:w-auto bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
        Save Changes
      </button>
    </div>
  );
}

function NotificationRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-4 sm:px-6">
      <span className="text-lg font-semibold text-foreground">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Security Settings
        </h2>
        <p className="text-muted-foreground">
          These settings will help you keep your account secure
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-b border-border pb-6">
          <h3 className="font-semibold text-foreground mb-2">Change Password</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Set a unique password for your account
          </p>
          <button className="border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/10 transition-colors">
            Change Password
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">
            Change Security Questions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure security challenges for your account
          </p>
          <button className="border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/10 transition-colors">
            Change Security Questions
          </button>
        </div>
      </div>
    </div>
  );
}

function UserPresets() {
  const presets = [
    "FOREX Presets",
    "SPOT INDICES Presets",
    "METALS Presets",
    "SPOT OIL Presets",
    "SPOT COMMODITIES Presets",
    "INDICES FUTURE EXPIRY Presets",
    "CRYPTO Presets",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          User Presets
        </h2>
        <p className="text-muted-foreground">
          Configure your variable trading options
        </p>
      </div>

      <div className="space-y-3">
        {presets.map((preset) => (
          <div
            key={preset}
            className="flex items-center justify-between bg-muted/30 px-4 py-3 rounded-lg border border-border"
          >
            <span className="font-medium text-foreground">{preset}</span>
            <button className="text-accent font-medium text-sm hover:text-accent/80 transition-colors">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
