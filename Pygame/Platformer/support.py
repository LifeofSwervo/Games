from os import walk
import pygame

def importFolder(path):
    surfaceList = []

    for _, __, imgFiles in walk(path):
        for image in imgFiles:
            fullPath = path + '/' + image
            imageSurf =  pygame.image.load(fullPath).convert_alpha()
            surfaceList.append(imageSurf)

    return surfaceList
