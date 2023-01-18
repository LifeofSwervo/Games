import pygame

def golemAnimation():
    global golemSurface, golemIdleIndex
    
    golemIdleIndex += 0.1
    if golemIdleIndex >= len(golemIdle): golemIdleIndex = 0
    golemSurface = golemIdle[int(golemIdleIndex)]

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
golemIdle0 = pygame.image.load('Assets/Enemies/Idle/golemIdle0.png')
golemIdle1 = pygame.image.load('Assets/Enemies/Idle/golemIdle1.png')
golemIdle2 = pygame.image.load('Assets/Enemies/Idle/golemIdle2.png')
golemIdle3 = pygame.image.load('Assets/Enemies/Idle/golemIdle3.png')
golemIdle4 = pygame.image.load('Assets/Enemies/Idle/golemIdle4.png')
golemIdle5 = pygame.image.load('Assets/Enemies/Idle/golemIdle5.png')
golemIdle6 = pygame.image.load('Assets/Enemies/Idle/golemIdle6.png')
golemIdle7 = pygame.image.load('Assets/Enemies/Idle/golemIdle7.png')
golemIdle = [golemIdle0, golemIdle1, golemIdle2, golemIdle3, golemIdle4, golemIdle5, golemIdle6, golemIdle7]
golemIdleIndex = 0


golemSurface = golemIdle[golemIdleIndex]
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

    #Golem
    golemAnimation()
    screen.blit(golemSurface, golemRect)


    #FPS
    pygame.display.update()
    clock.tick(60)