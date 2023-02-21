# 데이터 전체 갯수 확인
SELECT count(*) from board


# 두 퀴리 검색 속도 비교
select *
	from board 
	WHERE  title = '0.9509922852283271'
;
select *
	from board 
	WHERE  number = 6
;

# 옵티마이저 실행계획 확인
explain
	select *
	from board 
	WHERE  title = '0.9509922852283271'
;

explain
	select *
	from board 
	WHERE  number = 6
;

#인덱스 확인
show index from board
;

# 인덱스 생성
CREATE index idx_title on board(title)
;

#인덱스 확인
show index from board
;

# 옵티마이저 실행계획 확인
explain
	select *
	from board 
	WHERE  title = '0.9509922852283271'
;

# 두 퀴리 검색 속도 비교
select *
	from board 
	WHERE  title = '0.9509922852283271'
;
select *
	from board 
	WHERE  number = 6
;