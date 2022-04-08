## 220408 Git basics

### Git 파일 영역의 라이프 사이클
* working directory
* staging area (git add)
* repository (git commit, push)

### Git 주요 명령어
```sh
git init <repository name> :새로운 repository 생성. repo 이름 없으면 해당 디렉토리를 repo화함
git log :최근 git log 확인  
git log --graph :변경사항 graph로 확인

git status :staging area에 대한 정보 확인
git reset HEAD <file> :add 했던 파일(staging) 취소

git commit -a "commit msg"
git commit --ammend :commit 관련 정보 수정
git diff :commit 된 파일 중 변경된 사항을 비교

git branch -d <branch name> :branch 삭제
git merge: merge 하려는 중심 branch에서 merge
git merge conflict :충돌 발생한 파일 수정 -> add -> commit ->중심 repo로 이동하여 merge

git remote add origin <주소>
git remote -v :원격저장소 이름, 주소 확인
git remote show origin

git pull origin master
git fetch origin :pull할 내용(변경사항)을 확인. 로컬 파일에 변경사항이 반영되지 않음
```




