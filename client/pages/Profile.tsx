import { useState } from "react";
import { ChevronLeft, ChevronRight, Lock, Bell, Settings as SettingsIcon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type ProfileSection = "personal" | "notifications" | "security" | "presets";

export default function Profile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ProfileSection>("notifications");
  const [mobilePromotions, setMobilePromotions] = useState(false);
  const [mobileOrders, setMobileOrders] = useState(false);
  const [mobileNews, setMobileNews] = useState(false);

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: SettingsIcon },
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "security", label: "Security Settings", icon: Lock },
    { id: "presets", label: "User Presets", icon: Zap },
  ] as const;

  if (activeSection === "notifications") {
    return (
      <>
        <div className="md:hidden -mx-3 -my-3 sm:-mx-4 sm:-my-4 min-h-[calc(100vh-7rem)] bg-background px-4 pt-3 pb-28">
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 inline-flex items-center justify-center text-foreground/80"
              aria-label="Go back"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <h1 className="text-5xl font-semibold text-[#8192B8] leading-none">Settings</h1>
            <Bell className="h-8 w-8 text-[#8192B8]" />
          </div>

          <h2 className="mt-8 mb-5 text-6xl font-bold text-foreground leading-none">Notifications</h2>

          <div className="space-y-4">
            <MobileSettingsRow
              label="Promotions and offers"
              checked={mobilePromotions}
              onToggle={() => setMobilePromotions((prev) => !prev)}
            />
            <MobileSettingsRow
              label="Order updates"
              checked={mobileOrders}
              onToggle={() => setMobileOrders((prev) => !prev)}
            />
            <MobileSettingsRow
              label="App news"
              checked={mobileNews}
              onToggle={() => setMobileNews((prev) => !prev)}
            />
          </div>

          <div className="fixed bottom-5 left-4 right-4">
            <button className="w-full rounded-3xl bg-[#3D8084] px-6 py-5 text-4xl font-semibold text-white">
              Save Settings
            </button>
          </div>
        </div>

        <div className="hidden md:block space-y-6">
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
                <NotificationSettings />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Menu Sidebar */}
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

        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white border border-border rounded-xl p-6 md:p-8">
            {activeSection === "personal" && (
              <PersonalInformation />
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
          Update your profile information visible on the CRM platform
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
      <MobileSwitch checked={checked} onToggle={() => onCheckedChange(!checked)} />
    </div>
  );
}

function MobileSettingsRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[28px] border-2 border-[#CBD5E6] bg-background px-5 py-4">
      <span className="text-[24px] font-medium text-[#7A8BB1]">{label}</span>
      <MobileSwitch checked={checked} onToggle={onToggle} />
    </div>
  );
}

function MobileSwitch({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative h-[64px] w-[132px] rounded-full transition-colors",
        checked ? "bg-[#9FB1D0]" : "bg-[#C7D0E0]"
      )}
      aria-pressed={checked}
      aria-label="Toggle setting"
    >
      <span
        className={cn(
          "absolute top-1/2 h-[54px] w-[54px] -translate-y-1/2 rounded-full bg-white transition-all",
          checked ? "right-[5px]" : "left-[5px]"
        )}
      />
    </button>
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
