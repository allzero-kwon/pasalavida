# pasalavida
Pasalavida project

## 0. 기본 정보
### 기본 
https://allzero-kwon.github.io/pasalavida/

### 신랑 혼주 청첩장 
https://allzero-kwon.github.io/pasalavida/?t=h1

### 신부 혼주 청첩장
https://allzero-kwon.github.io/pasalavida/?t=h2


--- 

## 2. 프로젝트 셋업 & 배포 
- node 설치
https://velog.io/@ljs923/Node.js-다운로드-및-설치하기

- 프로젝트 빌드 & 배포  

```
npm install 
npm run build
npm run deploy
```

- 프로젝트 중간중간 확인 

```
npm run dev
```

---

## 3. 커스터마이징 
1. 이미지 & 비디오 바꾸기 
1.1 이미지 사진 줄이기 
빠른 로딩을 위해 사진 사이즈를 줄이기
https://www.iloveimg.com/ko/resize-image/resize-jpg


1.2 이미지 변경 
src/assets/images 
00.png => 청첩장 메인 사진 
01~12 => 갤러리 사진

1.3 비디오 변경 
src/assets/videos 
landing1.mp4, landing2.mp4 가 랜덤으로 재생 

비디오 스킵하고 싶으면 그대로 놔두고 url 끝에 
type=skip 넣으면 됨. 

https://allzero-kwon.github.io/pasalavida/?v=skip


2. 멘트 및 정보 변경
src/data.json 
title,
message => 신랑/신부용 메세지 
message_h => 신랑 혼주쪽 메세지 
message_y => 신부 혼주쪽 메세지 
host
hostinfo 
mapinfo 


3. 네이버 지도 변경 
src/layout/Location/Map.tsx 

```
  const { lat, lon } = { lat: 127.0497041, lon: 37.5044068 };
```

위경도 찾기 : https://letsplaycoding.tistory.com/26 참고 


4. Share (공유) 정보 
모청 주소를 카카오톡으로 공유하면 이미지랑 정보들이 뜸 
해당 정보를 변경 

dist/index.html 내의 아래 정보들 변경

```
    <title>동현와 다영, 결혼합니다</title>
    <meta name="description" content="2024년 9월 29일 (일) 14:00 선릉 르비르모어 클리타홀">
    <meta name="description" property="og:description" content="2024년 9월 29일 (일) 14:00 선릉 르비르모어 클리타홀">
```


