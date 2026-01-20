import { THEME_COLORS } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import DynamicButton from '../../common/Buttons/DynamicButton';
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';

interface TeamsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
  onNavigateToInvite?: () => void;
}

const Teams: React.FC<TeamsProps> = ({ onBack, onNavigateToInvite }) => {
  const insets = useSafeAreaInsets();

  const handleInviteTeam = () => {
    if (onNavigateToInvite) {
      onNavigateToInvite();
    }
  };

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavHeader title=" Meet Our Team !">
          <DynamicButton
            text="Invite"
            onPress={handleInviteTeam}
            backgroundColor="transparent" 
            textColor="#5152B3"
            paddingVertical={8}
            paddingHorizontal={5}
            fontSize={18} 
            fontWeight="bold"
          />
        </NavHeader>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[
            styles.mainScroll, 
            { paddingBottom: 60 + insets.bottom } 
          ]}
        >
          <View style={styles.contentFadeIn}>
            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=1' }}
              title="Ahmad Ali"
              description="Senior Stylist - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />

            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=2' }}
              title="Sara Khan"
              description="Color Expert - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />

            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=3' }}
              title="Zeenat Malik"
              description="Manager - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />

            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=4' }}
              title="Hamza Sheikh"
              description="Junior Stylist - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />

            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=5' }}
              title="Danish Ahmed"
              description="Assistant - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />

            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=2' }}
              title="Sara Khan"
              description="Color Expert - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />

            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=3' }}
              title="Zeenat Malik"
              description="Manager - Active"
              backgroundColor="#FFFFFF"
              containerStyle={styles.cardMargin}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  mainScroll: {
    paddingHorizontal: 15, 
    paddingTop: 5,
  },
  contentFadeIn: {
    width: '100%',
    marginTop: 0,
  },
  cardMargin: {
    marginBottom: 0, 
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default Teams;