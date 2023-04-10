import pygame

class Horse(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()

        #Run
        horseRun0 = pygame.image.load('Assets/Enemies/Run/Gallop0.png')
        horseRun1 = pygame.image.load('Assets/Enemies/Run/Gallop1.png')
        horseRun2 = pygame.image.load('Assets/Enemies/Run/Gallop2.png')
        horseRun3 = pygame.image.load('Assets/Enemies/Run/Gallop3.png')
        self.horseRun = [horseRun0, horseRun1, horseRun2, horseRun3]
        self.horseRunIndex = 0

        #Surface & Rectangle
        self.image = self.horseRun[self.horseRunIndex]
        self.rect = self.image.get_rect(midbottom = (620, 283))

    
    def animation(self):
        self.horseRunIndex += 0.2
        if self.horseRunIndex >= len(self.horseRun): self.horseRunIndex = 0
        self.image = self.horseRun[int(self.horseRunIndex)]



    def movement(self):
        self.rect.x -= 10
        if self.rect.x <= -200:
            self.rect.x = 850


    def update(self):
        self.animation()
        self.movement()
