<div align="center">
  <img src="./IMG/PERFEST LOGO BLACK.png"  width="700">
</div>

## 👀 프로젝트 소개

<br>

### ARCHITECTURE
<div align="center">
  <img src="./IMG/PERFEST ARCHITECTURE.png"  width="700" height="400">
</div>
공공 데이터 API를 활용해 전국의 축제 데이터를 받아와 유저가 한 눈에 간편하게 확인할 수 있도록 정보를 제공, 관련 상품 결제와 커뮤니티 기능도 이용할 수 있는 축제 커뮤니티 사이트입니다.

[PERFEST 바로가기](http://13.125.132.119:8111)

## 🏃‍♀️ 개발 기간

<br>

- 2023.06.23 ~ 2023.08.03

## 🤼‍♂️ 참여 인원

<br>

- 곽용석([Github Profile](https://github.com/yasungg)) : Spring Security 인증, 인가(로그인, 회원가입) 구현, 랜딩 페이지 제작, 반응형 디자인 적용, 페이지네이션 구현, 재사용성 스타일 컴포넌트 정리, 축제 상세 정보 페이지 제작

- 이동현([Github Profile](https://github.com/Happycookie0722)) : 결제, 예약,지역찾기

- 김정민([Github Profile](https://github.com/qhwkal1)) : 마이페이지, 타임라인 알람, 캘린더

- 신형환([Github Profile](https://github.com/siyh22)) : 지역찾기

- 정우진([Github Profile](https://github.com/Woojine)) : 커뮤니티(게시판,댓글,리뷰), 랭킹

## ⚙️ 개발 환경

<br>

### Frontend

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat&logo=styledcomponents&logoColor=white"/>

### Backend

<img src="https://img.shields.io/badge/Java-4479A1?style=flat&logo=coffeescript&logoColor=white"/> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=springboot&logoColor=white"/> <img src="https://img.shields.io/badge/SpringSecurity-6DB33F?style=flat&logo=springsecurity&logoColor=white"/> <img src="https://img.shields.io/badge/Junit5-25A162?style=flat&logo=junit5&logoColor=white"/>

### DB

<img src="https://img.shields.io/badge/mySQL-4479A1?style=flat&logo=a&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFA000?style=flat&logo=a&logoColor=white"/>

### WebServer

<img src="https://img.shields.io/badge/Apache-D22128?style=flat&logo=apache&logoColor=white"/>

### WAS

<img src="https://img.shields.io/badge/Tomcat-F8DC75?style=flat&logo=apachetomcat&logoColor=white"/>

### Distribution

<img src="https://img.shields.io/badge/AWS EC2-FF9900?style=flat&logo=amazonec2&logoColor=white"/>

### Tools

<img src="https://img.shields.io/badge/Intellij-000000?style=flat&logo=intellijidea&logoColor=white"/> <img src="https://img.shields.io/badge/VS Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white"/>

### Cooperation

<img src="https://img.shields.io/badge/Github-181717?style=flat&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white"/>

## 📁 프로젝트 기능

<br>

#### Spring Security, JWT를 활용한 인증, 인가

- Client에서 전송한 모든 Request들은 Filter Chain을 거쳐 저희 서버로 들어오게 됩니다. 요청 정보로 전달된 {id, password}를 검증한 뒤 인증을 통과시켜 JWT를 발급할지 인증을 거부하여 예외를 발생시킬지 결정합니다. 더불어, URL 접근 제어 규칙을 설정해 요청의 요청 정보, 권한 정보, 인증 정보를 심사하여 인가 여부를 결정합니다.

#### 공공데이터 정보를 활용한 축제 정보 제공

- 정부에서 제공하는 공공데이터 API를 받아온 뒤 유저 친화적 정보로 가공하여 제공합니다. 유저는 대한민국에서 개최되는 대부분의 축제 정보를 보기 좋게 디자인 된 UI를 통해 확인할 수 있습니다.
- KAKAO PAY를 활용한 해당 축제 관련 상품 구매, 액티비티 예약 결제 기능이 구현되어 있습니다.
- 관심있는 축제의 일정을 회원 개인 캘린더에 등록해 관리할 수 있습니다.
- 축제에 참가한 뒤 리뷰를 작성할 수 있습니다. 리뷰 작성을 활성화시키기 위한 리뷰 작성 점수제를 도입하여 색다른 재미를 제공합니다.

#### 축제를 테마로 한 커뮤니티

- 커뮤니티에서 함께 축제에 참여할 인원을 구할 수 있고, 축제에 관한 정보를 교환할 수도 있습니다.

#### 리뷰 작성 점수, 축제 사용 금액으로 매겨지는 랭킹 시스템

- 리뷰 작성과 축제 소비를 통한 지역경제 활성화를 위해 랭킹 시스템을 도입하였습니다.
