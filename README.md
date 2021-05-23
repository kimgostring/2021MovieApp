# inflearn
### 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의 (boilerPlate)
- ⏰ **기간** : 05/01 ~ 05/18 (완)
- 📽 **강의영상** :  https://www.inflearn.com/course/따라하며-배우는-노드-리액트-기본
- ✏ **필기** : https://www.notion.so/Inflearn-66f3aa27e4d8461595de7e1c06fff398
- 🔎 **사용법**

  1. `$ git clone`으로 코드 다운로드
  2. [Node.js](https://nodejs.org/ko/) 다운로드
  3. client 폴더와 server 폴더에서 `$ npm install`을 입력해, *package.json* 파일에 입력된 라이브러리 다운로드
  4. [Mongo DB](https://www.mongodb.com/) 클러스터 생성 후, *connect - connect your application*에 들어가면 나오는 URL 복사
  5. *Database Access - ADD NEW DATABASE USER*에서 유저 추가, 4번 URL의 `<username>`과 `<password>` 부분에 유저 정보를 채워넣어 수정
  6. *server/config/dev.js* 파일을 생성하고, `MongoPri` 객체를 만들고 5번의 URL 값을 `MONGO_URL` 속성으로 추가하여 export