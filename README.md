# inflearn
### 따라하며 배우는 노드, 리액트 시리즈 - 영화 사이트 만들기
- ⏰ **기간** : 05/23 ~ 06/07 (완)
- 📽 **강의영상** : https://www.inflearn.com/course/따라하며-배우는-노드-리액트-영화사이트-만들기
- ✏ **필기** : https://www.notion.so/Inflearn-725aec72cf554ada9dfff72b48b9565c
- 🔎 **사용법**

  1. `$ git clone`으로 코드 다운로드
  2. [Node.js](https://nodejs.org/ko/) 다운로드
  3. client 폴더와 server 폴더에서 `$ npm install`을 입력해, *package.json* 파일에 입력된 라이브러리 다운로드
  4. [Mongo DB](https://www.mongodb.com/) 클러스터 생성 후, *connect - connect your application*에 들어가면 나오는 URL 복사
  5. *Database Access - ADD NEW DATABASE USER*에서 유저 추가, 4번 URL의 `<username>`과 `<password>` 부분에 유저 정보를 채워넣어 수정
  6. *server/config/dev.js* 파일을 생성하고, 아래의 코드 추가
      ```
      const mongoPri = {
          MONGO_URL = <URL>
      };

      exports.mongoPri = mongoPri;
      ```
  7. [The Movie](https://www.themoviedb.org/) 가입 후, *Settings - API - Request an API Key - Developer*에서 API 키 받기
  8. *client/src/Config.js* 파일을 생성하고, 아래의 코드 추가
      ```
      export const USER_SERVER = '/api/users';
      export const API_KEY = <API 키>
      export const API_URL = 'https://api.themoviedb.org/3';
      export const IMG_URL = 'https://image.tmdb.org/t/p';
      ```
  9. *server* 폴더에서 `npm run dev`커맨드를 통해 실행