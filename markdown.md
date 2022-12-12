curl 'GET' \
  'http://localhost:8000/api/patients' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMjFiOTI4MS02NGMwLTQ3NmEtYmJjNi05MGJjZjY1ZTk3ZmQiLCJleHAiOjE2Njk5NDc0MTYsInN1YiI6ImpvZW1hbWFAbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkIjo4LCJuYW1lIjoiSm9lIE1hbWEiLCJlbWFpbCI6ImpvZW1hbWFAbWFpbC5jb20iLCJwaWQiOjEyMzQ1fX0.o6IGsfYLVHAwIfzBOtlfLmyK273S8EDel56DzUG6IOk'


curl -X 'GET' \
  'http://localhost:8000/api/patients'
  -H 'accept: application/json'

curl.exe http://localhost:8000/api/patients
  -H "accept: application/json"
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJqdGkiOiJjMjFiOTI4MS02NGMwLTQ3NmEtYmJjNi05MGJjZjY1ZTk3ZmQiLCJleHAiOjE2Njk5NDc0MTYsInN1YiI6ImpvZW1hbWFAbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkIjo4LCJuYW1lIjoiSm9lIE1hbWEiLCJlbWFpbCI6ImpvZW1hbWFAbWFpbC5jb20iLCJwaWQiOjEyMzQ1fX0.o6IGsfYLVHAwIfzBOtlfLmyK273S8EDel56DzUG6IOk"
