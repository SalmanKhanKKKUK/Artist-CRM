import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface CalendarCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  onDateSelect?: (date: Date) => void;
  showHeader?: boolean;
}

const CalendarCard: React.FC<CalendarCardProps> = ({
  title,
  subtitle,
  icon,
  onDateSelect,
  showHeader = true,
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (): (number | null)[] => {
    const days: (number | null)[] = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = daysInMonth(year, month);
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    return days;
  };

  const changeMonth = (offset: number): void => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(nextDate);
  };

  const handleDayPress = (day: number): void => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
    if (onDateSelect) {
      onDateSelect(newSelectedDate);
    }
  };

  const isToday = (day: number): boolean => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day: number): boolean => {
    return day === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <View style={styles.cardContainer}>
      {showHeader && (
        <View style={styles.headerSection}>
          <View style={styles.leftInfo}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons 
                name={icon as MaterialIconName} 
                size={22} 
                color="#5152B3" 
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>{title}</Text>
              {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          {/* Note: Cross div is completely removed from here */}
        </View>
      )}

      <View style={styles.calendarBody}>
        <View style={styles.navigationRow}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="#5152B3" />
          </TouchableOpacity>
          
          <View style={styles.monthYearDisplay}>
            <Text style={styles.monthNameText}>{monthNames[currentDate.getMonth()]}</Text>
            <Text style={styles.yearNameText}>{currentDate.getFullYear()}</Text>
          </View>

          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
            <MaterialCommunityIcons name="chevron-right" size={30} color="#5152B3" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <View key={day} style={styles.weekCell}>
              <Text style={styles.weekText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.gridContainer}>
          {generateCalendarDays().map((day, index) => {
            const daySelected = day !== null && isSelected(day);
            const dayIsToday = day !== null && isToday(day);

            return (
              <TouchableOpacity
                key={index}
                onPress={() => day && handleDayPress(day)}
                disabled={!day}
                style={[
                  styles.dayCell,
                  daySelected ? styles.selectedDayCell : null,
                  dayIsToday ? styles.todayCell : null,
                ]}
              >
                {day && (
                  <Text style={[
                    styles.dayText,
                    (daySelected || dayIsToday) && styles.whiteText
                  ]}>
                    {day}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  calendarBody: {
    padding: 20,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  navBtn: {
    padding: 5,
  },
  monthYearDisplay: {
    alignItems: 'center',
  },
  monthNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  yearNameText: {
    fontSize: 14,
    color: '#5152B3',
    fontWeight: '700',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  weekCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 12,
  },
  dayText: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },
  whiteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectedDayCell: {
    backgroundColor: '#5152B3',
  },
  todayCell: {
    backgroundColor: '#5152B3',
    borderWidth: 2,
    borderColor: '#5152B3',
  },
});

export default CalendarCard;
// ye reusable component hai
// s ko hum ne Calender k liye reusbale bana ya hai
// ye project k andar jitne b calendar used hoi hai os k liye hai
// s ko setting page k andar used kia hoa hai 

