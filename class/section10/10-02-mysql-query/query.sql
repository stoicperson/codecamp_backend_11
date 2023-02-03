show databases
;

use myproject
;

show tables
;

desc product 
;

SELECT * FROM product
;

# MYSQL에서는 큰따옴표("")와 작은따옴표('')가 큰 차이 없으나, 다른 SQL DB는 대부분 작은 따옴표('')를 사용
INSERT into product(id, name, description, price)
				values(uuid(), '마우스", "정말 좋은 마우스입니다', 15000)				
;

INSERT into product(id, name, description, price)
				values(uuid(),'노트북' ,'노트북 최신 맥북!!', 20000)				
;

INSERT into product(id, name, description, price)
				values(uuid(), '셔츠', '깔끔한 셔츠입니다', 30000)				
;

DELETE FROM product WHERE name = '셔츠'
;

UPDATE product set price = 18000 WHERE name = '마우스'
;

# ========== 조인 ==========

SELECT * FROM  product_saleslocation
;

INSERT into product_saleslocation(id, address, addressDetail, lat, lng, meetingTime)
							values(uuid(), '구로구', '구로디지털단지', 37.12981 , 127.1293212, '2023-02-03')
;

UPDATE product set productSaleslocationId = 'a8717baf-a397-11ed-9ddf-74e5f9c58780' WHERE name = '마우스'

SELECT p.id, name, price, address, addressDetail 
FROM product p, product_saleslocation ps 
WHERE p.productSaleslocationId = ps.id  
;

# ========= 추가기능들 =========
UPDATE product 
	set isSoldout = TRUE 
WHERE name = '노트북'
AND price = 200000
;

UPDATE product 
	set isSoldout = TRUE 
WHERE name = '노트북'
OR price = 200000
;

# ========= 주석 쉽게 다는 방법 ============
#         => update/delete에서는 가급적 사용하지 말자
SELECT *
FROM product p 
WHERE TRUE 
-- AND name = '마우스'
-- AND price = 18000
AND isSoldout = false
;
