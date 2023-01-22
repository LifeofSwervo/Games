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

    



        self.image = self.playerRun[self.playerRunIndex]
        self.rect = self.image.get_rect(midbottom = (190, 280))
        self.gravity = 0

    def playerInput(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_SPACE] and self.rect.bottom >= 280:
            self.jumping = True
            self.gravity = -20
            

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
            self.playerRunIndex += 0.2
            if self.playerRunIndex >= len(self.playerRun): self.playerRunIndex = 0
            self.image = self.playerRun[int(self.playerRunIndex)]

    def update(self):
        self.playerInput()
        self.applyGravity()
        self.animationState()

    


def playerAnimation ():
    global playerSurface, playerRunIndex, playerJumpIndex, playerFallIndex, jumping, falling

    if playerGravity >= 0: 
        playerFallIndex += 0.2
        if playerFallIndex >= len(playerFall): playerFallIndex = 0
        playerSurface = playerFall[int(playerFallIndex)]

    elif jumping:
        playerJumpIndex += 0.2
        if playerJumpIndex >= len(playerJump): playerJumpIndex = 0
        playerSurface = playerJump[int(playerJumpIndex)]
        if playerGravity >= 0:
            falling = True
            jumping = False

    elif falling:
        playerFallIndex += 0.2
        if playerFallIndex >= len(playerFall): playerFallIndex = 0
        playerSurface = playerFall[int(playerFallIndex)]
        if PlayerRect.bottom >= 280:
            falling = False

    else:
        playerRunIndex += 0.2
        if playerRunIndex >= len(playerRun): playerRunIndex = 0
        playerSurface = playerRun[int(playerRunIndex)]

    


#Setup
pygame.init()
screen = pygame.display.set_mode((800,400))
pygame.display.set_caption('Ninja Run')
clock = pygame.time.Clock()

player = pygame.sprite.GroupSingle()
player.add(Player())

#Background
groundSurface = pygame.image.load('Assets/World/StraightLand.png')
skySurface = pygame.image.load('Assets/World/Sky1.png')

#Player
    #Run
playerRun1 = pygame.image.load('Assets/Player/Run/NinjaRun0.png')
playerRun2 = pygame.image.load('Assets/Player/Run/NinjaRun1.png')
playerRun3 = pygame.image.load('Assets/Player/Run/NinjaRun2.png')
playerRun4 = pygame.image.load('Assets/Player/Run/NinjaRun3.png')
playerRun5 = pygame.image.load('Assets/Player/Run/NinjaRun4.png')
playerRun6 = pygame.image.load('Assets/Player/Run/NinjaRun5.png')
playerRun7 = pygame.image.load('Assets/Player/Run/NinjaRun6.png')
playerRun8 = pygame.image.load('Assets/Player/Run/NinjaRun7.png')
playerRun = [playerRun1, playerRun2, playerRun3, playerRun4, playerRun5, playerRun6, playerRun7, playerRun8]
playerRunIndex = 0

    #Jump
playerJump1 = pygame.image.load('Assets/Player/Jump/Jump0.png')
playerJump2 = pygame.image.load('Assets/Player/Jump/Jump1.png')
playerJump = [playerJump1, playerJump2]
playerJumpIndex = 0
jumping = False

    #Fall
playerFall1 = pygame.image.load('Assets/Player/Jump/Fall0.png')
playerFall2 = pygame.image.load('Assets/Player/Jump/Fall1.png')
playerFall = [playerFall1, playerFall2]
playerFallIndex = 0
falling = False


playerSurface = playerRun[playerRunIndex]
PlayerRect = playerSurface.get_rect(midbottom = (80, 310))
playerGravity = 0

#Enemies


golemSurface = pygame.image.load('Assets/Enemies/Idle/golemIdle0.png')
golemRect = golemSurface.get_rect(midbottom = (620, 270))

#Game Loop
while True:
    #Input Handler
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
        
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and PlayerRect.bottom >= 280:
                jumping = True
                playerGravity = -20 

    #Background
    screen.blit(skySurface, (0,0))
    screen.blit(groundSurface, (0,270))
    
  
    #Player    
    playerGravity += 1
    PlayerRect.y += playerGravity 

    if PlayerRect.bottom >= 280: 
        PlayerRect.bottom = 280
        playerGravity = -1
        jumping = False
        falling = False

    if jumping and playerGravity >= 0:
        falling = False
        jumping = False

    playerAnimation() 
    screen.blit(playerSurface, PlayerRect)
    player.draw(screen)
    player.update()

    #Golem
    screen.blit(golemSurface, golemRect)


    #FPS
    pygame.display.update()
    clock.tick(60)