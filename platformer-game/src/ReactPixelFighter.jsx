import React, { useState, useEffect, useRef, useCallback } from 'react';

const ReactPixelFighter = () => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    keys: {},
    gameOver: false,
    winner: null,
    player1: null,
    player2: null,
    platforms: [],
    animationId: null
  });

  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Player class
  class Player {
    constructor(x, y, color, controls) {
      this.x = x;
      this.y = y;
      this.width = 20;
      this.height = 30;
      this.color = color;
      this.vx = 0;
      this.vy = 0;
      this.onGround = false;
      this.health = 100;
      this.facing = 1;
      this.attacking = false;
      this.attackCooldown = 0;
      this.controls = controls;
      this.speed = 3;
      this.jumpPower = 12;
    }

    update(platforms, otherPlayer, updateHealth) {
      if (gameStateRef.current.gameOver) return;

      const keys = gameStateRef.current.keys;
      
      // Handle input
      this.vx = 0;
      if (keys[this.controls.left]) {
        this.vx = -this.speed;
        this.facing = -1;
      }
      if (keys[this.controls.right]) {
        this.vx = this.speed;
        this.facing = 1;
      }
      if (keys[this.controls.jump] && this.onGround) {
        this.vy = -this.jumpPower;
        this.onGround = false;
      }
      if (keys[this.controls.attack] && this.attackCooldown <= 0) {
        this.attack(otherPlayer);
      }

      // Apply gravity
      this.vy += 0.5;

      // Update position
      this.x += this.vx;
      this.y += this.vy;

      // Platform collision
      this.onGround = false;
      platforms.forEach(platform => {
        if (this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y + this.height > platform.y &&
            this.y + this.height < platform.y + platform.height + 10) {
          this.y = platform.y - this.height;
          this.vy = 0;
          this.onGround = true;
        }
      });

      // Boundary collision
      if (this.x < 0) this.x = 0;
      if (this.x + this.width > 800) this.x = 800 - this.width;
      if (this.y > 400) {
        this.y = 400 - this.height;
        this.vy = 0;
        this.onGround = true;
      }

      // Update timers
      if (this.attackCooldown > 0) this.attackCooldown--;
      if (this.attacking) this.attacking = false;

      // Update health in React state
      updateHealth(this.health);
    }

    attack(otherPlayer) {
      this.attacking = true;
      this.attackCooldown = 20;

      const attackRange = 35;
      const dx = otherPlayer.x - this.x;
      const dy = otherPlayer.y - this.y;

      if (Math.abs(dx) < attackRange && Math.abs(dy) < this.height) {
        if ((this.facing === 1 && dx > 0) || (this.facing === -1 && dx < 0)) {
          otherPlayer.takeDamage(15);
          // Knockback
          otherPlayer.vx = this.facing * 5;
          otherPlayer.vy = -3;
          otherPlayer.onGround = false;
        }
      }
    }

    takeDamage(amount) {
      this.health -= amount;
      if (this.health <= 0) {
        this.health = 0;
        gameStateRef.current.gameOver = true;
        const winnerName = this === gameStateRef.current.player1 ? "Player 2" : "Player 1";
        gameStateRef.current.winner = winnerName;
      }
    }

    draw(ctx) {
      // Draw player
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // Draw eyes
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x + 3, this.y + 5, 4, 4);
      ctx.fillRect(this.x + 13, this.y + 5, 4, 4);
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x + 4 + (this.facing === 1 ? 1 : -1), this.y + 6, 2, 2);
      ctx.fillRect(this.x + 14 + (this.facing === 1 ? 1 : -1), this.y + 6, 2, 2);

      // Draw attack effect
      if (this.attacking) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
        ctx.fillRect(
          this.x + (this.facing === 1 ? this.width : -15),
          this.y,
          15,
          this.height
        );
      }

      // Draw health bar
      const barWidth = this.width;
      const barHeight = 4;
      const healthPercent = this.health / 100;

      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y - 8, barWidth, barHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x, this.y - 8, barWidth * healthPercent, barHeight);
    }
  }

  // Platform class
  class Platform {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    draw(ctx) {
      ctx.fillStyle = '#654321';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(this.x, this.y, this.width, 5);
    }
  }

  // Initialize game
  const initGame = useCallback(() => {
    const player1 = new Player(100, 300, '#ff4444', {
      left: 'a', right: 'd', jump: 'w', attack: 'f'
    });

    const player2 = new Player(650, 300, '#4444ff', {
      left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp', attack: 'Enter'
    });

    const platforms = [
      new Platform(0, 380, 800, 20),      // Ground
      new Platform(200, 320, 120, 15),    // Left platform
      new Platform(480, 320, 120, 15),    // Right platform
      new Platform(350, 260, 100, 15),    // Middle platform
      new Platform(100, 220, 80, 15),     // High left
      new Platform(620, 220, 80, 15),     // High right
    ];

    gameStateRef.current.player1 = player1;
    gameStateRef.current.player2 = player2;
    gameStateRef.current.platforms = platforms;
    gameStateRef.current.gameOver = false;
    gameStateRef.current.winner = null;
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { player1, player2, platforms } = gameStateRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    platforms.forEach(platform => platform.draw(ctx));

    // Update and draw players
    if (player1 && player2) {
      player1.update(platforms, player2, setPlayer1Health);
      player2.update(platforms, player1, setPlayer2Health);
      player1.draw(ctx);
      player2.draw(ctx);
    }

    // Check game over
    if (gameStateRef.current.gameOver && !gameOver) {
      setGameOver(true);
      setWinner(gameStateRef.current.winner);
    }

    // Draw game over screen
    if (gameStateRef.current.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${gameStateRef.current.winner} Wins!`, canvas.width / 2, canvas.height / 2);

      ctx.font = '24px monospace';
      ctx.fillText('Click Reset to play again', canvas.width / 2, canvas.height / 2 + 50);
    }

    gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
  }, [gameOver]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = true;
      gameStateRef.current.keys[e.key] = true;
    };

    const handleKeyUp = (e) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = false;
      gameStateRef.current.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Initialize and start game
  useEffect(() => {
    initGame();
    gameLoop();

    return () => {
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
    };
  }, [initGame, gameLoop]);

  const resetGame = () => {
    if (gameStateRef.current.animationId) {
      cancelAnimationFrame(gameStateRef.current.animationId);
    }
    
    setPlayer1Health(100);
    setPlayer2Health(100);
    setGameOver(false);
    setWinner(null);
    
    initGame();
    gameLoop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-4 space-y-2">
        <div className="text-sm">
          <div>Player 1: WASD + F (attack)</div>
          <div>Player 2: Arrow Keys + Enter (attack)</div>
        </div>
        <div className="flex justify-between w-64 text-sm">
          <div>P1 Health: {player1Health}</div>
          <div>P2 Health: {player2Health}</div>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border-2 border-gray-600 bg-gradient-to-b from-sky-300 to-green-300"
      />
      
      {gameOver && (
        <button
          onClick={resetGame}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default ReactPixelFighter;