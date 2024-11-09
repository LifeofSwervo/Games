// Game.hpp
#include <raylib.h>
#include <vector>
#include <memory>

/*
#include "Common.h"
#include "Entity.h"
#include "EntityManager.h"
 */

struct PlayerConfig { int SR, CR, FR, FG, FB, OR, OG, OB, OT, V; float S; };
struct EnemyConfig  { int SR, CR, OR, OG, OB, OT, VMIN, VMAX, L, SI; float SMIN, SMAX; };
struct BulletConfig { int SR, CR, FR, FG, FB, OR, OG, OB, OT, V, L; float S; };

class Game
{
    int m_lastEnemySpawnTime = 0;
    int m_currentFrame = 0;
    int m_score = 0;
    bool m_running = true; //Tracking if the game is running
    bool m_paused = false; //Tracking if we stopped updating game logic
    
    //std::shared_ptr<Entity> m_player;
    
    void init(const std::string & config); // Inits game-state with a config filepath
    void setPaused(bool paused); // Pause game
    
    // System Functions
    void sMovement();          // System: Entity Position / Movement update
    void sUserInput();         // System: User Input
    void sLifespan();          // System: Lifespan
    void sRender();            // System: Render / Drawing
    void sEnemySpawner();      // System: Spawns Enemy
    void sCollision();         // System: Collisions
    
    void spawnPlayer();
    void spawnEnemy();
    void spawnBullet(std::shared_ptr<Entity> entity, const Vec2 & mousePos);
    
    
public:
    
    
    
    


};
