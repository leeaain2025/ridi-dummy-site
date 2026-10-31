# RIDI 더미 사이트

리디북스 도서 추천 페이지(https://ridibooks.com/ebook/recommendation)를 모방한 **시연용 정적 사이트**입니다.
서버 없이 HTML/CSS/JS 만으로 동작하며, 상태는 브라우저 `localStorage` 에 저장됩니다.

## 동작하는 흐름

| 페이지 | 파일 | 설명 |
|---|---|---|
| 도서 추천(메인) | `index.html` | 배너·퀵메뉴·추천 섹션. 우상단 **로그인 / 마이페이지** |
| 로그인 | `login.html` | 아이디·비밀번호 검증 (`?return_url=` 지원) |
| 마이페이지 | `mypage.html` | 자산·계정 정보·최근 읽은 책. **정보 변경 / 비밀번호 변경** 링크 |
| 정보 변경 | `account.html` | 기본 정보 + 보안 메뉴 → **비밀번호 변경** |
| 비밀번호 변경 | `password.html` | 현재/새/확인 비밀번호 입력 → 실시간 규칙 검사 → 성공 화면 |

데모 계정: 아이디 `ridi_demo` / 비밀번호 `Demo1234!`
변경된 비밀번호는 같은 브라우저에서 유지됩니다. 로그인 페이지 하단 "여기" 링크로 초기화할 수 있습니다.

비밀번호 규칙: 8~32자, 영문/숫자/특수문자 중 2가지 이상, 공백 없음, 아이디 미포함, 현재 비밀번호와 다름.

## 자동화 테스트용 셀렉터

- 로그인: `#login-id`, `#login-pw`, `#login-keep`, `#login-submit`, 오류 `#login-alert`
- 헤더: 로그인 전 `#nav-login`, 로그인 후 `#nav-mypage`
- 마이페이지/정보변경: 비밀번호 변경 링크 `#go-password`
- 비밀번호 변경: `#cur-pw`, `#new-pw`, `#new-pw2`, `#pw-submit`, 오류 `#pw-alert`, 성공 `#pw-success`
- 로그아웃: 사이드바 `#logout`

## 로컬 실행

```bash
cd dummy-site
python3 -m http.server 8080
# http://localhost:8080
```

## 배포

정적 호스팅 어디든 올리면 됩니다 (빌드 없음).

- **Vercel**: `vercel --prod` (프레임워크 Other)
- **Netlify**: 폴더를 드래그 앤 드롭, 또는 `netlify deploy --prod --dir .`
- **GitHub Pages**: 저장소 루트에 두고 Pages 활성화

## 실제 표지 이미지 사용하기

리디 API 는 봇 차단이 있어 자동 수집이 안 됩니다. 브라우저에서 직접 뽑으세요.

1. 크롬에서 리디 도서 추천 페이지를 열고 끝까지 스크롤합니다.
2. 개발자도구 Console 에 `tools/extract-books.js` 내용을 붙여넣고 실행합니다.
3. 클립보드에 복사된 `RIDI.BOOKS = [...]` 를 `js/data.js` 의 기존 `RIDI.BOOKS` 와 교체합니다.
4. `RIDI.SECTIONS` / `RIDI.USER_SEED.shelf` 의 `books` 번호를 새 id 범위에 맞게 조정합니다.

또는 개별 항목의 `cover` 에 `https://img.ridicdn.net/cover/<책ID>/xxlarge` 형태의 URL 을 직접 넣어도 됩니다.
`cover` 가 비어 있으면 제목 기반 SVG 표지가 자동 생성됩니다.
