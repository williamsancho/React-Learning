package com.williamsancho.Crud.controller;


import com.williamsancho.Crud.dto.ProductDto;
import com.williamsancho.Crud.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody ProductDto productDto){
        String response = productService.addProduct(productDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProduct(){

        List<ProductDto> allProducts = productService.getAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body(allProducts);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable int productId){

        ProductDto product = productService.getProductById(productId);
        if(product == null) {

            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> deleteProductById(@PathVariable int productId) {

        boolean response = productService.delete(productId);
        if (!response) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to delete product.");

        } else {
            return ResponseEntity.status(HttpStatus.OK).body("Product was deleted successfully.");
        }
    }

    @PutMapping("/product/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable int productId,
                                                @RequestBody ProductDto productDto){

        String response = productService.updateProduct(productId, productDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }



}
