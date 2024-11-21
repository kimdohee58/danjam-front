# danjam-backend
### 1. **백엔드**:
   - **Spring Boot**: 안정적인 REST API 서버 구현
   - **Gradle**: 빌드 도구로 Gradle을 사용하여 프로젝트 관리
   - **MySQL**: 데이터베이스 관리
   - **Spring Security**: 로그인 및 인증을 위한 보안 관리 (FormLogin, OAuth, JWT)
   - **JPA/MyBatis**: 데이터베이스 ORM을 위한 JPA 또는 MyBatis 사용

### 2. **프론트엔드**:
   - **React**: UI를 위한 JavaScript 라이브러리
   - **Styled Components** (또는 Tailwind CSS/Bootstrap): 스타일링을 위한 CSS 라이브러리
   - **react-calendar**: 예약 날짜를 선택할 수 있는 캘린더 컴포넌트
   - **react-datepicker**: 날짜 선택을 위한 라이브러리
   - **date-fns**: 날짜를 처리하기 위한 유틸리티 라이브러리

## 설치 방법

### 1. **백엔드 (Spring Boot)**
1. 레포지토리 클론하기:
   ```bash
   git clone https://github.com/kimdohee58/danjam-backend.git
2. 프로젝트 디렉토리로 이동:
   ```bash
   cd danjam-backend
3. Gradle 빌드:
   ```bash
   ./gradlew build
4. MySQL 설정: MySQL 데이터베이스를 설정하고 application.properties 파일에 데이터베이스 연결 정보를 추가합니다.
5. 서버 실행:
   ```bash
   ./gradlew bootRun

### 2. **프론트엔드 (React)**
1. 레포지토리 클론하기:
   ```bash
   git clone https://github.com/kimdohee58/danjam-frontend.git
2. 프로젝트 디렉토리로 이동:
   ```bash
   cd danjam-frontend
3. 의존성 설치:
   ```bash
   npm install
4. 서버 실행:
   ```bash
   npm start

### 3. **캘린더 및 날짜 선택 기능 설치**
1. react-calendar 설치:
   ```bash
   npm install react-calendar
2. react-datepicker 설치:
   ```bash
   npm install react-datepicker
3. date-fns 설치:
   ```bash
   npm install date-fns

## 사용법
서버가 실행되면 웹 브라우저에서 아래 주소로 접속할 수 있습니다:
- http://localhost:3000 (프론트엔드)
- http://localhost:8080 (백엔드)

## 문의
프로젝트에 대해 질문이 있거나 피드백을 주고 싶다면 kimdohee58@gmail.com으로 연락 주세요.

감사합니다!
