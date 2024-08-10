import {useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import List from "./List";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/locale";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import SearchResult from "./SearchResult";

function Search() {
    const [search, setSearch] = useState({
        city: '',
        date: [],
        person: '',
    })

    const cityList = ["서울특별시", "경기도", "강원도", "인천광역시",
        "충청북도", "충청남도", "경상남도", "경상북도", "전라남도", "전라북도",
        "부산광역시", "대전광역시", "울산광역시", "광주광역시", "대구광역시"]
    const [selectedCity, setSelectedCity] = useState()
    const handleSelect = (e) => {
        setSelectedCity(e.currentTarget.value)
    }

    // calendar
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: null,
    })

    const setChangeDate = (dates) => {
        const [start, end] = dates
        setSelectedDate({
            startDate: start,
            endDate: end,
        })
    }

    // person
    let [selectedPerson, setSelectedPerson] = useState(0)

    let onMinus = () => {
        setSelectedPerson(selectedPerson - 1);
    }

    let onPlus = () => {
        setSelectedPerson(selectedPerson + 1);
    }

    // submit
    const navigate = useNavigate()

    const onSubmit = () => {
        setSearch({
            city: selectedCity,
            date: selectedDate,
            person: selectedPerson,
        })
        console.log(search)
        // navigate('/search')
    }

    // https://ityranno.tistory.com/entry/react-Spring-Boot-Spring-Boot-%EB%8D%B0%EC%9D%B4%ED%84%B0-react%EC%97%90-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                {/* https://wazacs.tistory.com/31 */}
                <select onChange={handleSelect} value={selectedCity}>
                    <option value={'선택'} key={'선택'}>
                        도시 선택
                    </option>
                    {cityList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>

                {/* calendar */}
                <DatePicker
                    selectsRange={true}
                    className="datepicker"
                    // locale={ko}
                    dateFormat="MM월 dd일"
                    selected={selectedDate.startDate}
                    startDate={selectedDate.startDate}
                    endDate={selectedDate.endDate}
                    minDate={new Date()} // minDate 이전 날짜 선택 불가
                    maxDate={new Date('2025-12-31')} // maxDate 이후 날짜 선택 불가
                    onChange={setChangeDate}/>
                {/*<DatePicker
                    selectsRange={true}
                    selectsStart={true}
                    selectsEnd={true}
                    dateFormat='yyyy.MM.dd' // 날짜 형태
                    shouldCloseOnSelect={true} // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    minDate={new Date()} // minDate 이전 날짜 선택 불가
                    maxDate={new Date('2025-12-31')} // maxDate 이후 날짜 선택 불가
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(dates) => onChangeDate(dates)}
                    monthsShown={2}
                    placeholderText={'날짜를 선택하세요'}
                    // excludeDates={selectedDate}
                />*/}

                {/* person */}
                <div>
                    인원 선택
                    <Button onClick={onMinus}>-</Button>
                    {selectedPerson}
                    <Button onClick={onPlus}>+</Button>
                </div>
                <Button onClick={onSubmit}>검색</Button>
            </div>
            <div>
                {search.city === '선택' || search.city === '' ? <List/> : <SearchResult search={search}/>}
            </div>
        </>
    );
}

export default Search