package com.williamsancho.Crud.repository;

import com.williamsancho.Crud.dto.ProductDto;
import com.williamsancho.Crud.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {



}
