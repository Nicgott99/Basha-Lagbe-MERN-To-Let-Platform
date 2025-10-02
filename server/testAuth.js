import fetch from 'node-fetch';

async function testAuth() {
  try {
    console.log('🔍 Testing authentication flow...\n');
    
    // Step 1: Sign in
    console.log('Step 1: Signing in...');
    const signinResponse = await fetch('http://localhost:5002/server/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      })
    });
    
    const signinData = await signinResponse.text();
    console.log('Signin Response Status:', signinResponse.status);
    console.log('Signin Response:', signinData);
    
    // Extract cookies from response headers
    const setCookieHeader = signinResponse.headers.get('set-cookie');
    console.log('Set-Cookie Header:', setCookieHeader);
    
    if (signinResponse.ok) {
      // Step 2: Test protected route
      console.log('\nStep 2: Testing protected route...');
      const profileResponse = await fetch('http://localhost:5002/server/user/profile', {
        method: 'GET',
        headers: {
          'Cookie': setCookieHeader || '',
        }
      });
      
      const profileData = await profileResponse.text();
      console.log('Profile Response Status:', profileResponse.status);
      console.log('Profile Response:', profileData);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAuth();