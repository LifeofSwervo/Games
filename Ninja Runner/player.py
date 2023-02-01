import pygame

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        playerRun1 = pygame.image.load('Assets/Player/Run/NinjaRun0.png')
        playerRun2 = pygame.image.load('Assets/Player/Run/NinjaRun1.png')
        playerRun3 = pygame.image.load('Assets/Player/Run/NinjaRun2.png')
        playerRun4 = pygame.image.load('Assets/Player/Run/NinjaRun3.png')
        playerRun5 = pygame.image.load('Assets/Player/Run/NinjaRun4.png')
        playerRun6 = pygame.image.load('Assets/Player/Run/NinjaRun5.png')
        playerRun7 = pygame.image.load('Assets/Player/Run/NinjaRun6.png')
        playerRun8 = pygame.image.load('Assets/Player/Run/NinjaRun7.png')
        self.playerRun = [playerRun1, playerRun2, playerRun3, playerRun4, playerRun5, playerRun6, playerRun7, playerRun8]
        self.playerRunIndex = 0
        self.running = True

            #Jump
        playerJump1 = pygame.image.load('Assets/Player/Jump/Jump0.png')
        playerJump2 = pygame.image.load('Assets/Player/Jump/Jump1.png')
        self.playerJump = [playerJump1, playerJump2]
        self.playerJumpIndex = 0
        self.jumping = False

            #Fall
        playerFall1 = pygame.image.load('Assets/Player/Jump/Fall0.png')
        playerFall2 = pygame.image.load('Assets/Player/Jump/Fall1.png')
        self.playerFall = [playerFall1, playerFall2]
        self.playerFallIndex = 0
        self.falling = False

            #Player Stand
        playerStand0 = pygame.image.load('Assets/Player/Idle/Idle0.png')
        playerStand1 = pygame.image.load('Assets/Player/Idle/Idle1.png')
        playerStand2 = pygame.image.load('Assets/Player/Idle/Idle2.png')
        playerStand3 = pygame.image.load('Assets/Player/Idle/Idle3.png')
        self.playerStand = [playerStand0, playerStand1, playerStand2, playerStand3]
        self.playerStandIndex = 0
        self.standing = False

            #Surface & Rectangle
        self.image = self.playerRun[self.playerRunIndex]
        self.rect = self.image.get_rect(midbottom = (190, 280))
        self.gravity = 0

    def playerInput(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_SPACE] and self.rect.bottom >= 280:
            self.jumping = True
            self.gravity = -23
            

    def applyGravity(self):
        self.gravity += 1
        self.rect.y += self.gravity
        if self.rect.bottom >= 280: 
            self.rect.bottom = 280
            self.gravity = -1
            self.jumping = False
            self.falling = False
    
    def animationState(self):
        if self.gravity > 0:
            self.playerFallIndex += 0.2
            if self.playerFallIndex >= len(self.playerFall): self.playerFallIndex = 0
            self.image = self.playerFall[int(self.playerFallIndex)]
        
        elif self.jumping:
            self.playerJumpIndex += 0.2
            if self.playerJumpIndex >= len(self.playerJump): self.playerJumpIndex = 0
            self.image = self.playerJump[int(self.playerJumpIndex)]
            if self.gravity >= 0:
                self.falling = True
                self.jumping = False

        elif self.falling:
            if self.rect.bottom >= 280 and not self.jumping:
                self.falling = False
                self.running = True
                self.image = self.playerRun[int(self.playerRunIndex)]
            else:   
                self.playerFallIndex += 0.2
                if self.playerFallIndex >= len(self.playerFall): self.playerFall = 0
                self.image = self.playerFall[int(self.playerFallIndex)]
        
        if self.running:
            if self.rect.bottom >= 280:
                self.jumping = True
                self.running = False

        else:
            self.running = True
            self.falling = False
            self.playerRunIndex += 0.4
            if self.playerRunIndex >= len(self.playerRun): self.playerRunIndex = 0
            self.image = self.playerRun[int(self.playerRunIndex)]

    def update(self):
        self.playerInput()
        self.applyGravity()
        self.animationState()