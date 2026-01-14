import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Reusable components imports
import ImageDesCard from '../../common/Cards/ImageDesCard';
import DynamicButton from '../../common/Buttons/DynamicButton';
import NavHeader from '../../common/Buttons/NavHeader';

interface TeamsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const Teams: React.FC<TeamsProps> = () => {
  const insets = useSafeAreaInsets();

  const handleInviteTeam = () => {
    console.log('Invite Team member pressed');
  };

  return (
    <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* NavHeader with Invite Button - Back Icon Removed */}
      <NavHeader 
        title="Our Team" 
      >
        <DynamicButton
          text="Invite"
          onPress={handleInviteTeam}
          backgroundColor="#5152B3"
          textColor="#FFFFFF"
          borderRadius={20}
          paddingVertical={8}
          paddingHorizontal={15}
          fontSize={14}
          fontWeight="bold"
        />
      </NavHeader>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexOne}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollBox}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 20 + insets.bottom }
          ]}
          bounces={false}
        >
          <View style={styles.contentFadeIn}>
            {/* 1. Ahmad Ali */}
            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=1' }}
              title="Ahmad Ali"
              description="Senior Stylist - Active"
              backgroundColor="#F8FAFC"
              containerStyle={styles.cardMargin}
            />

            {/* 2. Sara Khan */}
            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=2' }}
              title="Sara Khan"
              description="Color Expert - Active"
              backgroundColor="#F8FAFC"
              containerStyle={styles.cardMargin}
            />

            {/* 3. Zeenat Malik */}
            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=3' }}
              title="Zeenat Malik"
              description="Manager - Active"
              backgroundColor="#F8FAFC"
              containerStyle={styles.cardMargin}
            />

            {/* 4. Team Member 4 */}
            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=4' }}
              title="Hamza Sheikh"
              description="Junior Stylist - Active"
              backgroundColor="#F8FAFC"
              containerStyle={styles.cardMargin}
            />

            {/* 5. Team Member 5 */}
            <ImageDesCard
              imageSource={{ uri: 'https://i.pravatar.cc/150?u=5' }}
              title="Danish Ahmed"
              description="Assistant - Active"
              backgroundColor="#F8FAFC"
              containerStyle={styles.cardMargin}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
  scrollBox: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  contentFadeIn: {
    width: '100%',
  },
  cardMargin: {
    marginBottom: 15,
  },
});

export default Teams;