import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CalendarCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  showHeader?: boolean; // New prop to control header visibility
}

const CalendarCard: React.FC<CalendarCardProps> = ({
  title,
  subtitle,
  icon,
  onDateSelect,
  selectedDate = new Date(), // Default to current date
  showHeader = true, // Default to true for backward compatibility
}) => {
  // Initialize with current live date
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(0); // 0 means no day selected initially
  const [liveDate, setLiveDate] = useState(today);

  // Update live date every second for fully live calendar experience
  useEffect(() => {
    const updateLiveDate = () => {
      const now = new Date();
      setLiveDate(now);
    };

    // Update immediately
    updateLiveDate();

    // Set up interval to update every second for fully live experience
    const interval = setInterval(updateLiveDate, 1000);

    return () => clearInterval(interval);
  }, []);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const days = [];
    const daysCount = daysInMonth(liveDate); // Use liveDate for current month
    
    // Get the actual day of week for the first day of the current month
    const firstDay = new Date(liveDate.getFullYear(), liveDate.getMonth(), 1).getDay();
    
    // Add empty cells for days before month starts (Sunday = 0, Monday = 1, etc.)
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the current month
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    const newDate = new Date(liveDate.getFullYear(), liveDate.getMonth(), day);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  // Auto-select today's date when calendar loads and when it becomes today
  useEffect(() => {
    const today = liveDate.getDate();
    
    if (selectedDay === 0) {
      setSelectedDay(today);
    }
  }, [liveDate, selectedDay]);

  const handleCalendarPress = () => {
    const dayToSelect = selectedDay > 0 ? selectedDay : liveDate.getDate();
    const newDate = new Date(liveDate.getFullYear(), liveDate.getMonth(), dayToSelect);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Show header only if showHeader is true */}
      {showHeader && (
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <MaterialCommunityIcons 
              name={icon as any}
              size={20} 
              color="#FFD700" 
              style={styles.cardIcon}
            />
            <View style={styles.textSection}>
              <Text style={styles.cardTitle}>{title}</Text>
              {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={handleCalendarPress}
            style={styles.calendarIconContainer}
          >
            <MaterialCommunityIcons 
              name="calendar" 
              size={24} 
              color="#FFD700" 
            />
          </TouchableOpacity>
        </View>
      )}
      
      {/* Full Calendar Section */}
      <View style={styles.calendarContainer}>
        {/* Month/Year Header with Live Time - Fully Live */}
        <View style={styles.monthYearHeader}>
          <View style={styles.monthYearContainer}>
            <Text style={styles.monthYearText}>
              {monthNames[liveDate.getMonth()]} {liveDate.getFullYear()}
            </Text>
            <Text style={styles.liveTimeText}>
              {liveDate.toLocaleTimeString()}
            </Text>
            <Text style={styles.liveDateText}>
              {liveDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Text>
          </View>
        </View>
        
        {/* Days of Week Header - Dynamic */}
        <View style={styles.daysOfWeekContainer}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <View key={day} style={styles.dayOfWeekCell}>
              <Text 
                style={[
                  styles.dayOfWeekText,
                  index === liveDate.getDay() && styles.currentDayOfWeekText
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
        
        {/* Calendar Days Grid - Always shows current month */}
        <ScrollView style={styles.daysContainer} contentContainerStyle={styles.daysContent}>
          <View style={styles.daysGrid}>
            {generateCalendarDays().map((day, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => day && handleDayPress(day)}
                  style={[
                    styles.dayCell,
                    !day && styles.emptyDay,
                    selectedDay > 0 && day === selectedDay && styles.selectedDay,
                    day === liveDate.getDate() && 
                    liveDate.getMonth() === liveDate.getMonth() && 
                    liveDate.getFullYear() === liveDate.getFullYear() && styles.today
                  ]}
                  disabled={!day}
                >
                  {day && (
                    <Text style={[
                      styles.dayText,
                      selectedDay > 0 && day === selectedDay && styles.selectedDayText,
                      day === liveDate.getDate() && 
                      liveDate.getMonth() === liveDate.getMonth() && 
                      liveDate.getFullYear() === liveDate.getFullYear() && styles.todayText
                    ]}>
                      {day}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#000000", // Black background for professional look
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#FFD700", // Gold shadow for premium feel
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#FFD700", // Gold border
    overflow: 'hidden', // Prevent content overflow
    minWidth: 300, // Adjusted width for proper calendar fit
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#FFD700",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    marginRight: 15,
  },
  textSection: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#CCCCCC', // Light gray for subtitle
    marginTop: 3,
  },
  calendarIconContainer: {
    padding: 8,
    backgroundColor: '#FFD700',
    borderRadius: 20,
  },
  calendarContainer: {
    padding: 15,
    backgroundColor: '#000000',
    width: '100%',
    minWidth: 300, // Adjusted width
  },
  monthYearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    minWidth: 270, // Adjusted for better fit
  },
  monthYearContainer: {
    alignItems: 'center',
    flex: 1,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  liveTimeText: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 2,
    fontWeight: '500',
  },
  liveDateText: {
    fontSize: 10,
    color: '#CCCCCC',
    marginTop: 2,
    fontWeight: '400',
  },
  navButton: {
    padding: 8,
    backgroundColor: '#FFD700',
    borderRadius: 15,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 3, // Minimal padding for tight fit
    borderRadius: 8,
    width: '100%',
  },
  dayOfWeekCell: {
    width: '14.285%', // Exact 1/7th width like calendar buttons
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayOfWeekText: {
    fontSize: 10, // Slightly smaller for better fit
    fontWeight: 'bold',
    color: '#FFD700', // Gold for day headers
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  currentDayOfWeekText: {
    color: '#FFFFFF', // White for current day
    backgroundColor: '#FFD700', // Gold background for current day
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  daysContainer: {
    maxHeight: 240,
    width: '100%',
  },
  daysContent: {
    paddingBottom: 15,
    width: '100%',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 3, // Match week container padding
  },
  dayCell: {
    width: '14.285%', // Exact 1/7th of width for 7 columns
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
    marginHorizontal: 0, // No horizontal margin for tight fit
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  emptyDay: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    // Ensure empty cells maintain same spacing as regular cells
    width: '14.285%',
    height: 40,
    marginVertical: 1,
    marginHorizontal: 0,
  },
  selectedDay: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  today: {
    backgroundColor: '#2a2a2a',
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  dayText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  todayText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default CalendarCard;
// ye reusable component hai
// s ko hum ne Calender k liye reusbale bana ya hai
// ye project k andar jitne b calendar used hoi hai os k liye hai
// s ko setting page k andar used kia hoa hai 

