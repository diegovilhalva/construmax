<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('cover_image')->nullable();
            $table->foreignId('team_member_id')->nullable()
                ->constrained('team_members')
                ->nullOnDelete();
            $table->string('status')->default('draft');
            $table->integer('views')->default(0);
            $table->string('category')->default('Geral'); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};