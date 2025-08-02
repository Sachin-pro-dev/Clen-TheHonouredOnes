import React, { useState } from 'react';
import { User, Shield, Bell, Eye, Download, HelpCircle, Settings, Edit3, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    wallet: '0x7A9f...3D2e'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    publicProfile: false
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // TODO: Save to backend
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // TODO: Reset form data
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-glass p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} className="gap-2 btn-primary">
                    <Check className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit} className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                ) : (
                  <div className="p-3 bg-muted/30 rounded-md">{profileData.name}</div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                ) : (
                  <div className="p-3 bg-muted/30 rounded-md flex items-center justify-between">
                    {profileData.email}
                    <Badge className="bg-success/10 text-success">Verified</Badge>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Phone</label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                ) : (
                  <div className="p-3 bg-muted/30 rounded-md flex items-center justify-between">
                    {profileData.phone}
                    <Badge className="bg-warning/10 text-warning">Pending</Badge>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Wallet Address</label>
                <div className="p-3 bg-muted/30 rounded-md flex items-center justify-between">
                  <span className="font-mono">{profileData.wallet}</span>
                  <Badge className="bg-success/10 text-success">Connected</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">Change Password</div>
                  <div className="text-sm text-muted-foreground">Update your account password</div>
                </div>
                <Button variant="outline">Change</Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">Backup Recovery</div>
                  <div className="text-sm text-muted-foreground">Download wallet backup phrase</div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Backup
                </Button>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h3>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium capitalize">
                      {key === 'sms' ? 'SMS' : key} Notifications
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {key === 'email' && 'Receive updates via email'}
                      {key === 'push' && 'Browser push notifications'}
                      {key === 'sms' && 'Text message alerts'}
                      {key === 'marketing' && 'Promotional offers and updates'}
                    </div>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, [key]: checked})
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Verified</span>
                <Badge className="bg-success/10 text-success">✓</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Phone Verified</span>
                <Badge className="bg-warning/10 text-warning">Pending</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Identity Verified</span>
                <Badge className="bg-success/10 text-success">✓</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">2FA Enabled</span>
                <Badge className="bg-destructive/10 text-destructive">✗</Badge>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy
            </h3>
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">
                      {key === 'shareData' && 'Share Usage Data'}
                      {key === 'analytics' && 'Analytics Tracking'}
                      {key === 'publicProfile' && 'Public Profile'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {key === 'shareData' && 'Help improve our services'}
                      {key === 'analytics' && 'Personalized insights'}
                      {key === 'publicProfile' && 'Visible to other users'}
                    </div>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, [key]: checked})
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <HelpCircle className="h-4 w-4" />
                Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;