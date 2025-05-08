import { COLORS, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ChartBar, House, User, Wallet } from "phosphor-react-native";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const tabbarIcons: any = {
    index: (isFocused: boolean) => (
      <House
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? COLORS.primary : COLORS.neutral400}
      />
    ),
    statistics: (isFocused: boolean) => (
      <ChartBar
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? COLORS.primary : COLORS.neutral400}
      />
    ),
    wallet: (isFocused: boolean) => (
      <Wallet
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? COLORS.primary : COLORS.neutral400}
      />
    ),
    profile: (isFocused: boolean) => (
      <User
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? COLORS.primary : COLORS.neutral400}
      />
    ),
  };

  return (
    <View
      style={[
        styles.tabbar,
        {
          paddingBottom: insets.bottom,
          height:
            Platform.OS === "ios"
              ? verticalScale(73) + insets.bottom
              : verticalScale(55) + insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    // height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(65),
    backgroundColor: COLORS.neutral800,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: COLORS.neutral700,
    borderTopEndRadius: 1,
  },
  tabbarItem: {
    marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomTabs;
