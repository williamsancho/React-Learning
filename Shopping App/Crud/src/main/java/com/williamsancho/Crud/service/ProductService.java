package com.williamsancho.Crud.service;

import com.williamsancho.Crud.dto.ProductDto;
import com.williamsancho.Crud.entity.Product;
import com.williamsancho.Crud.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public String addProduct(ProductDto product){

        try{
            Product product1 = new Product();
            product1.setName(product.getName());
            product1.setPrice(product.getPrice());
            product1.setCategory(product.getCategory());

            productRepository.save(product1);

            return "Product has been successfully added.";


        } catch (Exception e) {
            return "Unable to register " + product.getName();
        }


    }

    public String updateProduct(int productId, ProductDto product){

        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(!optionalProduct.isEmpty()){

            return "Unable to locate product.";
        }
        else{

           Product product2 = optionalProduct.get();
            product2.setName(product.getName());
            product2.setPrice(product.getPrice());
            product2.setCategory(product.getCategory());
            productRepository.save(product2);

            return product2.toString() + " was updated successfully.";


        }


    }


    public boolean delete(int productId){

        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(!optionalProduct.isEmpty()){

            return false;
        }
        else{

            productRepository.delete(optionalProduct.get());
            return true;

        }
    };



public ProductDto getProductById(int productId){

    Optional<Product> optionalProductDto = productRepository.findById(productId);

    if(!optionalProductDto.isEmpty()){

        return null;
    }
    else{

        Product product = optionalProductDto.get();
        return product.getProuductDto();
    }
};

public List<ProductDto> getAllProducts(){

    return productRepository.findAll().stream().map(Product::getProuductDto).collect(Collectors.toList());
}

}
