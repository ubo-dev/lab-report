package com.ubo.labreport.service;

import com.ubo.labreport.model.ImageData;
import com.ubo.labreport.repository.ImageDataRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ubo.labreport.util.ImageUtil;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageDataService {

    private final ImageDataRepository imageDataRepository;

    public String uploadImage(MultipartFile file) throws IOException {

        imageDataRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .dataOfImage(ImageUtil.compressImage(file.getBytes())).build());

        return ("Image uploaded successfully: " + file.getOriginalFilename());

    }

    @Transactional
    public ImageData getInfoByImageByName(String name) {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);

        return ImageData.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .dataOfImage(ImageUtil.decompressImage(dbImage.get().getDataOfImage())).build();

    }

    @Transactional
    public byte[] getImage(String name) {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);
        return ImageUtil.decompressImage(dbImage.get().getDataOfImage());
    }
}
