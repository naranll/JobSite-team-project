import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class CheckRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }
    // console.log('token exist');

    const decodedToken = this.jwtService.decode(token);
    // console.log('decoded token', decodedToken['role']);

    if (!decodedToken) {
      return false;
    }

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    // console.log('required roles', requiredRoles);

    if (!requiredRoles) {
      return false;
    }
    // console.log('is role');

    if (!requiredRoles.includes(decodedToken['role'])) {
      return false;
    }
    // console.log('user passed guard');
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const auth = request.headers.authorization?.split(' ') ?? [];
    const [type, token] = auth;
    return type === 'Bearer' ? token : undefined;
  }
}
