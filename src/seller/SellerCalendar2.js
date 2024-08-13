import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Header from "../Header";

// 접근성 향상을 위해 모달의 루트 엘리먼트를 설정
Modal.setAppElement('#root');

const SellerCalendar2 = () => {
    const location = useLocation();  // 현재 URL의 위치 정보를 가져옵니다.
    const userInfo = location.state.userInfo;  // URL 상태에서 사용자 정보를 가져옵니다.
    const [selectedDate, setSelectedDate] = useState(new Date());  // 선택된 날짜 상태
    const [events, setEvents] = useState([]);  // 선택된 날짜의 이벤트 상태
    const [eventsData, setEventsData] = useState({});  // 모든 날짜의 이벤트 데이터 상태
    const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 열림 상태
    const [selectedEventDetails, setSelectedEventDetails] = useState(null);  // 선택된 이벤트 세부 정보 상태
    const [searchDate, setSearchDate] = useState('');  // 검색 날짜 상태

    // 날짜를 YYYY-MM-DD 형식으로 포맷팅
    const formatDateString = (date) => {
        if (date) {
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            return utcDate.toISOString().split('T')[0];
        }
        return '';
    };

    // 날짜 변경 핸들러
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const dateString = formatDateString(date);
        setEvents(eventsData[dateString] || []);  // 선택된 날짜의 이벤트 설정
        setSearchDate(dateString);  // 입력 필드 업데이트
    };

    // 선택된 날짜의 이벤트가 있는지 확인
    const getTileClassName = (date) => {
        const dateString = formatDateString(date);
        return eventsData[dateString] ? 'highlighted-date' : '';  // 이벤트가 있는 날에 클래스 적용
    };

    // 선택된 이벤트 세부 정보를 가진 모달 열기
    const openModal = (eventDetails) => {
        setSelectedEventDetails(eventDetails);
        setModalIsOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEventDetails(null);
    };

    // 북킹 데이터를 가져오고 이벤트 데이터 처리
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const id = userInfo.id;  // 사용자 ID 가져오기
                const response = await axios.get(`http://localhost:8080/SellerCalendar/${id}`, {
                    withCredentials: true
                });
                console.log(response.data);  // 응답 데이터 확인

                // 이벤트 데이터 가공
                const fetchedEventsData = response.data.reduce((acc, booking) => {
                    const checkInDate = new Date(booking.booking.checkIn);
                    const checkInDateString = checkInDate.toISOString().split('T')[0];

                    const checkOutDate = new Date(booking.booking.checkOut);
                    const checkOutDateString = checkOutDate.toISOString().split('T')[0];

                    const eventDetails = {
                        type: 'Check-in',
                        userName: booking.booking.userName,
                        details: {
                            ...booking.booking,
                            address: booking.address,
                            hotelName: booking.name,
                            room: booking.room
                        }
                    };

                    // 체크인 날짜에 이벤트 추가
                    if (!acc[checkInDateString]) {
                        acc[checkInDateString] = [];
                    }
                    acc[checkInDateString].push(eventDetails);

                    const checkOutEventDetails = {
                        type: 'Check-out',
                        userName: booking.booking.userName,
                        details: {
                            ...booking.booking,
                            address: booking.address,
                            hotelName: booking.name,
                            room: booking.room
                        }
                    };

                    // 체크아웃 날짜에 이벤트 추가
                    if (!acc[checkOutDateString]) {
                        acc[checkOutDateString] = [];
                    }
                    acc[checkOutDateString].push(checkOutEventDetails);

                    return acc;
                }, {});

                setEventsData(fetchedEventsData);  // 이벤트 데이터 상태 업데이트
                const dateString = formatDateString(selectedDate);
                setEvents(fetchedEventsData[dateString] || []);  // 선택된 날짜의 이벤트 업데이트
            } catch (error) {
                console.error('Error fetching bookings:', error);  // 에러 처리
            }
        };

        fetchBookings();
    }, [userInfo.id, selectedDate]);

    // 검색 날짜 변경 핸들러
    const handleSearchDateChange = (e) => {
        const date = new Date(e.target.value);
        setSearchDate(e.target.value);
        if (!isNaN(date.getTime())) {
            setSelectedDate(date);
            const dateString = formatDateString(date);
            setEvents(eventsData[dateString] || []);  // 검색된 날짜의 이벤트 설정
        }
    };

    return (
        <>
            <Header userInfo={userInfo}/>
            <div style={{padding: '20px'}}>
                <h1>{userInfo.name} Seller Calendar</h1>  {/* 사용자 이름을 제목으로 표시 */}

                <div style={{marginBottom: '20px'}}>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={handleSearchDateChange}
                        placeholder="Select or enter a date"
                    />
                </div>

                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={({date}) => getTileClassName(date)}
                    />
                </div>

                {selectedDate && (
                    <div style={{marginTop: '20px'}}>
                        <h2>Events for {formatDateString(selectedDate)}:</h2>
                        <ul>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <li key={index}>
                                        <button onClick={() => openModal(event)}>
                                            {event.type}: {event.userName}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li>No events for this date.</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* 이벤트 세부 정보 모달 */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Event Details"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            maxWidth: '600px',
                        },
                    }}
                >
                    <h2>Event Details</h2>
                    {selectedEventDetails ? (
                        <div>
                            <p><strong>Type:</strong> {selectedEventDetails.type}</p>
                            <p><strong>Reservation Name:</strong> {selectedEventDetails.userName}</p>
                            <p><strong>Check-in Date:</strong> {selectedEventDetails.details.checkIn}</p>
                            <p><strong>Check-out Date:</strong> {selectedEventDetails.details.checkOut}</p>
                            <p><strong>Hotel Name:</strong> {selectedEventDetails.details.hotelName || 'N/A'}</p>
                            <p><strong>Address:</strong> {selectedEventDetails.details.address || 'N/A'}</p>
                            <p><strong>Room Name:</strong> {selectedEventDetails.details.room?.name || 'N/A'}</p>
                            <p><strong>Room Type:</strong> {selectedEventDetails.details.room?.type || 'N/A'}</p>
                        </div>
                    ) : (
                        <p>No details available.</p>
                    )}
                    <button onClick={closeModal}>Close</button>
                </Modal>

                <style>
                    {`
                    .highlighted-date {
                        background-color: red; /* 이벤트가 있는 날짜를 빨간색으로 강조 */
                        border-radius: 50%;
                        color: black;
                    }
                    .react-calendar__tile--highlighted-date {
                        background-color: #ffeb3b !important; /* 강조된 날짜를 노란색으로 설정 */
                        border-radius: 50%;
                        color: black;
                    }
                    .calendar-container {
                        display: flex;
                        margin: 20px 0;
                    }
                `}
                </style>
            </div>
        </>
    );
};

export default SellerCalendar2;
