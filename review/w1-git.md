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

### Git reset
* git status로 항상 이전의 staged 이력을 확인
* HEAD: 현재 브랜치를 가리키는 포인터. 현재 브랜치 마지막 커밋의 스냅샷
* git reset: 가장 최근의 git commit 명령을 되돌림
	* 1단계: HEAD가 가리키는 브랜치를 옮긴다 (--soft 명령이 붙으면 여기까지)
	* 2단계: INDEX를 HEAD가 가리키는 상태로 만든다 (--hard 명령이 붙으면 여기까지)
	* 3단계: working directory를 index의 상태로 만든다 
```sh
git reset HEAD <file> :add 했던 파일(staging) 취소
git reset --soft HEAD 
git reset --hard HEAD 
```
* git reset 예시
```sh
git commit -m "1"
git commit -m "2"
git commit -m "3"

git reset --soft [1번 commit hash] :변경 이력은 모두 삭제, 변경 내용은 stage 되어있음
git reset --hard [1번 commit hash] :커밋 이후 변경 이력 모두 삭제, 2,3번 커밋 반영 내용 모두 삭제
```



