//
//  Game.hpp
//  GW
//
//  Created by Paul Thomas on 11/22/24.
//

#ifndef Game_hpp
#define Game_hpp

#include "Common.h"
#include <stdio.h>

class Game
{
    int m_currentFrame = 0;
    
    
    
    // System functions
    void sRender(void);
    
public:
    void init(void);
    void run(void);
    
    
    
};

#endif /* Game_hpp */
