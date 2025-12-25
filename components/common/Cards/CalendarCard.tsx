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
  const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); // Start of current month

  // Update live date every second to keep it fully live
  useEffect(() => {
    const updateLiveDate = () => {
      const now = new Date();
      setLiveDate(now);
      
      // Update displayDate to stay synchronized with liveDate for fully live calendar
      setDisplayDate(new Date(now.getFullYear(), now.getMonth(), 1));
    };

    // Update immediately
    updateLiveDate();

    // Set up interval to update every second for fully live experience
    const interval = setInterval(updateLiveDate, 1000); // 1 second

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
    const daysCount = daysInMonth(displayDate); // Use displayDate for calendar grid
    
    // Get the actual day of week for the first day of the month
    // Use displayDate instead of currentDate
    const firstDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();
    
    // Add empty cells for days before month starts (Sunday = 0, Monday = 1, etc.)
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const handleCalendarPress = () => {
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), selectedDay);
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
        {/* Month/Year Header with Live Time - Fully Live Only */}
        <View style={styles.monthYearHeader}>
          <View style={styles.monthYearContainer}>
            <Text style={styles.monthYearText}>
              {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
            </Text>
            <Text style={styles.liveTimeText}>
              {liveDate.toLocaleTimeString()}
            </Text>
          </View>
        </View>
        
        {/* Days of Week Header - Dynamic */}
        <View style={styles.daysOfWeekContainer}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <Text 
              key={day} 
              style={[
                styles.dayOfWeekText,
                index === liveDate.getDay() && styles.currentDayOfWeekText
              ]}
            >
              {day}
            </Text>
          ))}
        </View>
        
        {/* Calendar Days Grid */}
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
                    displayDate.getMonth() === liveDate.getMonth() && 
                    displayDate.getFullYear() === liveDate.getFullYear() && styles.today
                  ]}
                  disabled={!day}
                >
                  {day && (
                    <Text style={[
                      styles.dayText,
                      selectedDay > 0 && day === selectedDay && styles.selectedDayText,
                      day === liveDate.getDate() && 
                      displayDate.getMonth() === liveDate.getMonth() && 
                      displayDate.getFullYear() === liveDate.getFullYear() && styles.todayText
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
  navButton: {
    padding: 8,
    backgroundColor: '#FFD700',
    borderRadius: 15,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    width: '100%',
  },
  dayOfWeekText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFD700', // Gold for day headers
    width: 38, // Adjusted for perfect 7-day fit
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
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-start',
  },
  dayCell: {
    width: 38, // Perfect for 7-column grid
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 19,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  emptyDay: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
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
