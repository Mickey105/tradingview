import { computed, reactive, readonly } from "vue";

export const layoutConfig = reactive({
  preset: "arya-orange", // Use "arya-orange" for dark mode
  primary: "orange", // Keep your primary color as yellow (or change as needed)
  surface: null,
  darkTheme: true, // Initialize as true for dark mode
  menuMode: "static",
});

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
});

export function useLayout() {
  const setPrimary = (value) => {
    layoutConfig.primary = value;
  };

  const setSurface = (value) => {
    layoutConfig.surface = value;
  };

  const setPreset = (value) => {
    layoutConfig.preset = value;
  };

  const setActiveMenuItem = (item) => {
    layoutState.activeMenuItem = item.value || item;
  };

  const setMenuMode = (mode) => {
    layoutConfig.menuMode = mode;
  };

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle(event));
  };

  document.documentElement.classList.remove("arya-orange", "sage-orange");

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    console.log("Dark Theme:", layoutConfig.darkTheme);
    console.log("Before Class List:", document.documentElement.classList);
    if (layoutConfig.darkTheme) {
      document.documentElement.classList.add("arya-orange");
    } else {
      document.documentElement.classList.add("sage-orange");
    }
  };

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const resetMenu = () => {
    layoutState.overlayMenuActive = false;
    layoutState.staticMenuMobileActive = false;
    layoutState.menuHoverActive = false;
  };

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const getPrimary = computed(() => layoutConfig.primary);

  const getSurface = computed(() => layoutConfig.surface);

  return {
    layoutConfig: readonly(layoutConfig),
    layoutState: readonly(layoutState),
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
    setPrimary,
    setSurface,
    setPreset,
    resetMenu,
    setMenuMode,
  };
}
