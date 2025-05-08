import { COLORS } from "@/constants/theme";
import { accountOptionType } from "@/types";
import { GearSix, Lock, Power, User } from "phosphor-react-native";

const accountOptions: accountOptionType[] = [
  {
    title: "Edit Profile",
    icon: (
      <User
        size={26}
        color={COLORS.white}
        weight="fill"
      />
    ),
    routeName: "/(modals)/profileModal",
    bgColor: "#6366f1",
  },
  {
    title: "Settings",
    icon: (
      <GearSix
        size={26}
        color={COLORS.white}
        weight="fill"
      />
    ),
    // routeName: "/(modals)/profileModal",
    bgColor: "#059669",
  },
  {
    title: "Privacy Policy",
    icon: (
      <Lock
        size={26}
        color={COLORS.white}
        weight="fill"
      />
    ),
    // routeName: "/(modals)/profileModal",
    bgColor: COLORS.neutral600,
  },
  {
    title: "Logout",
    icon: (
      <Power
        size={26}
        color={COLORS.white}
        weight="fill"
      />
    ),
    // routeName: "/(modals)/profileModal",
    bgColor: "#e11D48",
  },
];

export default accountOptions;
