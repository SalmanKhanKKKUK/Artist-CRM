
export type ScreenType = 'Login' | 'Signup' | 'CompanyName' | 'Profile' | 'Home';

export interface NavigationServiceType {
    navigateTo: (screen: ScreenType, props?: any) => void;
    goBack: () => void;
    getCurrentScreen: () => ScreenType | null;
}

class NavigationService implements NavigationServiceType {
    private currentScreen: ScreenType | null = null;
    private navigationCallbacks: Map<string, (screen: ScreenType, props?: any) => void> = new Map();

    navigateTo(screen: ScreenType, props?: any) {
        this.currentScreen = screen;
        const callback = this.navigationCallbacks.get('navigate');
        if (callback) {
            callback(screen, props);
        }
    }

    goBack() {
        const callback = this.navigationCallbacks.get('goBack');
        if (callback) {
            callback(this.currentScreen!, undefined);
        }
    }

    getCurrentScreen() {
        return this.currentScreen;
    }

    registerNavigationCallback(type: 'navigate' | 'goBack', callback: (screen: ScreenType, props?: any) => void) {
        this.navigationCallbacks.set(type, callback);
    }

    unregisterNavigationCallback(type: 'navigate' | 'goBack') {
        this.navigationCallbacks.delete(type);
    }
}

export const navigationService = new NavigationService();
