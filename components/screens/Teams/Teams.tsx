import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import NavHeader from '../../common/Buttons/NavHeader';
import DynamicButton from '../../common/Buttons/DynamicButton';
import ImageDesCard from '../../common/Cards/ImageDesCard';

interface TeamsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const Teams: React.FC<TeamsProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  const handleInviteTeam = () => {
    console.log('Invite Team member pressed');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* FIXED HEADER: Stays in the same spot across screens */}
      <NavHeader 
        title=" Meet Our Team !"
      >
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
          {/* Team Cards */}
          <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=1' }}
            title="Ahmad Ali"
            description="Senior Stylist - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />

          <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=2' }}
            title="Sara Khan"
            description="Color Expert - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />

          <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=3' }}
            title="Zeenat Malik"
            description="Manager - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />

          <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=4' }}
            title="Hamza Sheikh"
            description="Junior Stylist - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />

          <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=5' }}
            title="Danish Ahmed"
            description="Assistant - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />

             <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=2' }}
            title="Sara Khan"
            description="Color Expert - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />

          <ImageDesCard
            imageSource={{ uri: 'https://i.pravatar.cc/150?u=3' }}
            title="Zeenat Malik"
            description="Manager - Active"
            backgroundColor="#F8FAFC"
            containerStyle={styles.cardMargin}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F5', 
  },
  mainScroll: {
    paddingHorizontal: 15, 
    paddingTop: 5,
  },
  contentFadeIn: {
    width: '100%',
    marginTop: 5,
  },
  cardMargin: {
    marginBottom: 5,
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});

export default Teams;