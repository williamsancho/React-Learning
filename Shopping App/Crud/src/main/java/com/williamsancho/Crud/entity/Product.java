package com.williamsancho.Crud.entity;


import com.williamsancho.Crud.dto.ProductDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String name;
    private double price;
    private String category;


    public ProductDto getProuductDto(){

        ProductDto product = new ProductDto();
        product.setProductId(productId);
        product.setName(name);
        product.setPrice(price);
        product.setCategory(category);

        return product;

    }

}
