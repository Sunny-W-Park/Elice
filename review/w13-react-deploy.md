## w13-220628-tue

### React 앱 배포하기
* 리액트 앱 준비(유의사항)
    * yarn.lock, package-lock.json 이 동시에 존재하는지 점검 -> pacakge 충돌
    * react build 실행
    * 로컬에서 배포, production build 실행 점검

### Azure VM에 배포하기
* Azure -> Virtual Machine으로 배포
* 접근 테스트
```sh
> mv {private_key} ~/.ssh # 다운받은 private key를 .ssh로 빝으로 옮기기
> ssh -i ./{private_key} azureuser@{ip_address}
# 나갈때는 exit
```

### React 앱 배포를 위한 VM 세팅
* VM에서 node.js, npm 설치
* npm package 설치
* 앱 세팅
1. 프로젝트 패키지 설치
```sh
> npm i
```
2. 빌드 후 배포
```sh
> sudo npm i -g serve
> npm run build
> sudo -s -p 80 build
```
3. IP주소로 접근하여 앱 테스트