# Sử dụng Nginx làm server web
FROM nginx:alpine

# Sao chép các tệp từ thư mục src vào thư mục /usr/share/nginx/html của container
COPY ./src /usr/share/nginx/html

# Mở port 80 cho server Nginx
EXPOSE 80

# Chạy Nginx khi container bắt đầu
CMD ["nginx", "-g", "daemon off;"]
