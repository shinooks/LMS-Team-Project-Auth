import React from 'react';

const CourseItem = ({ course, onAddToCart, isInCart, isEnrolled }) => {
  const { code, name, professor, credits, capacity, enrolled, schedule } = course;

  const formatSchedule = (schedule) => {
    return schedule.map(s => `${s.day} ${s.startTime}-${s.endTime} (${s.room})`).join(', ');
  };

  // 수강신청 가능 여부 확인
  const isAvailable = enrolled < capacity && !isInCart && !isEnrolled;

  return (
    <tr className={!isAvailable ? 'bg-gray-50' : ''}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {code}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {professor}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {credits}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className={enrolled >= capacity ? 'text-red-600' : ''}>
          {enrolled}/{capacity}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatSchedule(schedule)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {isEnrolled ? (
          <span className="text-green-600">수강중</span>
        ) : isInCart ? (
          <span className="text-blue-600">담기완료</span>
        ) : (
          <button
            onClick={() => onAddToCart(course)}
            disabled={!isAvailable}
            className={`${
              isAvailable
                ? 'text-blue-600 hover:text-blue-900'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            담기
          </button>
        )}
      </td>
    </tr>
  );
};

export default CourseItem;