-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_hoang
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `maChiTietDonHang` int NOT NULL AUTO_INCREMENT,
  `soLuong` int DEFAULT NULL,
  `tongTien` decimal(15,2) DEFAULT NULL,
  `maDonHang` int DEFAULT NULL,
  `maSanPham` int DEFAULT NULL,
  PRIMARY KEY (`maChiTietDonHang`),
  KEY `maDonHang` (`maDonHang`),
  KEY `maSanPham` (`maSanPham`),
  CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`maDonHang`) REFERENCES `donhang` (`maDonHang`),
  CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (1,2,500000.00,1,3),(2,3,600000.00,1,5);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `maDonHang` int NOT NULL AUTO_INCREMENT,
  `ngayLapDon` date DEFAULT NULL,
  `tongTien` decimal(15,2) DEFAULT NULL,
  `trangThai` varchar(50) DEFAULT NULL,
  `taiKhoanNhanVien` int DEFAULT NULL,
  `taiKhoanKhachHang` int DEFAULT NULL,
  PRIMARY KEY (`maDonHang`),
  KEY `taiKhoanNhanVien` (`taiKhoanNhanVien`),
  KEY `taiKhoanKhachHang` (`taiKhoanKhachHang`),
  CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`taiKhoanNhanVien`) REFERENCES `taikhoan` (`taiKhoan`),
  CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`taiKhoanKhachHang`) REFERENCES `taikhoan` (`taiKhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,'2025-05-01',1100000.00,'Chờ xác nhận',1,3);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `maKhachHang` int NOT NULL AUTO_INCREMENT,
  `hoTen` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `taiKhoan` int DEFAULT NULL,
  PRIMARY KEY (`maKhachHang`),
  UNIQUE KEY `taiKhoan` (`taiKhoan`),
  CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`taiKhoan`) REFERENCES `taikhoan` (`taiKhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1,'admin','admin@gmail.com',NULL,1),(2,'kh','kh@gmail.com',NULL,2),(3,'new KH','newkh@gmail.com',NULL,3);
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaisanpham`
--

DROP TABLE IF EXISTS `loaisanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaisanpham` (
  `maLoaiSanPham` int NOT NULL AUTO_INCREMENT,
  `tenLoaiSanPham` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`maLoaiSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaisanpham`
--

LOCK TABLES `loaisanpham` WRITE;
/*!40000 ALTER TABLE `loaisanpham` DISABLE KEYS */;
INSERT INTO `loaisanpham` VALUES (1,'Áo'),(2,'Quần'),(3,'Váy');
/*!40000 ALTER TABLE `loaisanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `maNhanVien` int NOT NULL AUTO_INCREMENT,
  `hoTen` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `chucVu` varchar(50) DEFAULT NULL,
  `taiKhoan` int DEFAULT NULL,
  PRIMARY KEY (`maNhanVien`),
  UNIQUE KEY `taiKhoan` (`taiKhoan`),
  CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`taiKhoan`) REFERENCES `taikhoan` (`taiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `maSanPham` int NOT NULL AUTO_INCREMENT,
  `tenSanPham` varchar(100) DEFAULT NULL,
  `anhSanPham` varchar(255) DEFAULT NULL,
  `kichThuoc` varchar(50) DEFAULT NULL,
  `mauSac` varchar(50) DEFAULT NULL,
  `soLuong` int DEFAULT NULL,
  `giaTien` decimal(15,0) DEFAULT NULL,
  `moTa` text,
  `maLoaiSanPham` int DEFAULT NULL,
  PRIMARY KEY (`maSanPham`),
  KEY `maLoaiSanPham` (`maLoaiSanPham`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`maLoaiSanPham`) REFERENCES `loaisanpham` (`maLoaiSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Áo thun nam','1746079139802-526042866.webp','M','Xanh',100,100000,'Áo thun nam',1),(2,'Áo thun MLB','1746088917324-366420164.webp','XL','Đen',90,200000,'Áo thun MLB',1),(3,'Áo polo nam','1746091266572-237383398.webp','32','Xám',20,250000,'Áo polo nam',1),(4,'Áo thun nam','1746079139802-526042866.webp','M','Xanh',100,100000,'Áo thun nam',1),(5,'Áo thun MLB','1746088917324-366420164.webp','XL','Đen',90,200000,'Áo thun MLB',1),(6,'Áo polo nam','1746091266572-237383398.webp','32','Xám',20,250000,'Áo polo nam',1),(7,'Quần thể thao nam','1746091432542-639162273.jpg','L','Đen',200,150000,'Quần thể thao co giãn tốt',2),(8,'Quần thể thao nam','1746091456641-439664237.webp','L','Đen',200,180000,'Quần thể thao co giãn tốt',2),(9,'Váy học sinh','1746091491644-70954174.webp','S','Đen',80,100000,'Váy học sinh hiện đại, dễ thương',3),(10,'Váy công sở','1746091515918-906015935.jpg','S','Đen',80,100000,'Váy công sở trẻ trung, hiện đại',3),(11,'Quần thể thao nam','1746091432542-639162273.jpg','L','Đen',200,150000,'Quần thể thao co giãn tốt',2),(12,'Quần thể thao nam','1746091456641-439664237.webp','L','Đen',200,180000,'Quần thể thao co giãn tốt',2),(13,'Quần thể thao nam','1746091432542-639162273.jpg','L','Đen',200,150000,'Quần thể thao co giãn tốt',2),(14,'Quần thể thao nam','1746091456641-439664237.webp','L','Đen',200,180000,'Quần thể thao co giãn tốt',2),(15,'Váy học sinh','1746091491644-70954174.webp','S','Đen',80,100000,'Váy học sinh hiện đại, dễ thương',3),(16,'Váy công sở','1746091515918-906015935.jpg','S','Đen',80,100000,'Váy công sở trẻ trung, hiện đại',3),(17,'Váy học sinh','1746091491644-70954174.webp','S','Đen',80,100000,'Váy học sinh hiện đại, dễ thương',3),(18,'Váy công sở','1746091515918-906015935.jpg','S','Đen',80,100000,'Váy công sở trẻ trung, hiện đại',3);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan` (
  `taiKhoan` int NOT NULL AUTO_INCREMENT,
  `matKhau` varchar(255) DEFAULT NULL,
  `soDienThoai` varchar(20) DEFAULT NULL,
  `trangThai` tinyint DEFAULT NULL,
  `ngayTao` date DEFAULT NULL,
  `loaiTaiKhoan` enum('KHACH_HANG','NHAN_VIEN','ADMIN') DEFAULT NULL,
  PRIMARY KEY (`taiKhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES (1,'$2b$10$kUC/G2qrSZcAt/pGLsZ4D.NLm7WyMPOo1gxsrjjQsBhwDFHpKp8ye','0999999999',1,'2025-05-01','ADMIN'),(2,'$2b$10$oCbbrKc.8QvTsIuyC6M1P.98Hv/fYW3HV9o4.8qY7QjWeTq6lSv7W','0123',1,'2025-05-01','KHACH_HANG'),(3,'$2b$10$qUeFQz0DK/w0VVwfoAnKQ.HVk8oDJSXoxQqsy9FiJsPkpNVJ.7XlW','0789789789',1,'2025-05-01','KHACH_HANG');
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01 17:25:44
