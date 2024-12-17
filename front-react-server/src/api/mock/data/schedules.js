// 시간표 전용 상세 데이터
export const scheduleDetails = {
    1: [
      { day: 'MON', startTime: '10:30', endTime: '12:00', room: '공학관 401' },
      { day: 'WED', startTime: '10:30', endTime: '12:00', room: '공학관 401' }
    ],
    2: [
      { day: 'TUE', startTime: '13:30', endTime: '15:00', room: '공학관 502' },
      { day: 'THU', startTime: '13:30', endTime: '15:00', room: '공학관 502' }
    ]
  };
  
  // 화면 표시용 간단한 스케줄 문자열
  export const scheduleStrings = {
    1: '월,수 10:30-12:00',
    2: '화,목 13:30-15:00'
  };