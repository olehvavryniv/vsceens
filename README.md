# vsceens

## Medical

### Backend
`docker build -t ghcr.io/olehvavryniv/vscreens-medical-backend:latest .`
`docker push ghcr.io/olehvavryniv/vscreens-medical-backend:latest`

### Frontend
`docker build -t ghcr.io/olehvavryniv/vscreens-medical-frontend:latest --platform=linux/arm/v7 .`
`docker push ghcr.io/olehvavryniv/vscreens-medical-frontend:latest`

## School

### Backend

### Frontend

#### Docker

Command examples
Build:
`docker build -f dockerfiles/school28/Dockerfile -t ghcr.io/olehvavryniv/vscreens-school-frontend:school28 .`

Push:
`docker push ghcr.io/olehvavryniv/vscreens-school-frontend:school28`

Run:
`docker run -d -p 80:80 ghcr.io/olehvavryniv/vscreens-school-frontend:school28`
