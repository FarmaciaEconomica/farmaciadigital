import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Camera,
  Check,
  Loader2,
  AlertCircle,
  X,
  Plus,
  Pill,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { useTheme } from '@/components/pharmacy/ThemeProvider';
import { formatWhatsAppNumber, createWhatsAppUrl } from '@/utils/whatsapp';

export default function UploadPrescription() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Formato inválido. Use JPG, PNG ou PDF.');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    setFile(selectedFile);

    // Create preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFileUrl(file_url);
      setIsUploading(false);
      setIsAnalyzing(true);

      try {
        const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
          file_url,
          json_schema: {
            type: 'object',
            properties: {
              medications: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, dosage: { type: 'string' }, quantity: { type: 'string' }, instructions: { type: 'string' } } } },
              doctor_name: { type: 'string' },
              crm: { type: 'string' },
              date: { type: 'string' }
            }
          }
        });
        if (result?.status === 'success' && result?.output) setExtractedData(result.output);
      } catch (e) {
        console.warn('Análise opcional falhou:', e);
      }
      setIsAnalyzing(false);
      setStep(3);
      toast.success('Receita anexada!');
    } catch (err) {
      setIsUploading(false);
      setIsAnalyzing(false);
      toast.error('Erro ao enviar arquivo. Tente novamente.');
    }
  };

  const handleSubmitPrescription = async () => {
    if (!customerInfo.name?.trim() || !customerInfo.phone?.trim()) {
      toast.error('Preencha nome e telefone.');
      return;
    }
    setIsSubmitting(true);
    try {
      await base44.entities.Prescription.create({
        customer_name: customerInfo.name.trim(),
        customer_phone: customerInfo.phone.replace(/\D/g, ''),
        customer_email: customerInfo.email?.trim() || null,
        file_url: fileUrl || null,
        notes: customerInfo.notes?.trim() || null,
        status: 'pending',
        extracted_data: extractedData || null,
        created_date: new Date().toISOString()
      });
      setSubmitted(true);
      toast.success('Receita registrada! Em breve entraremos em contato.');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const theme = useTheme();
  
  const handleSendToWhatsApp = () => {
    let message = `Olá! Gostaria de fazer um pedido baseado na minha receita médica.\n\n`;
    message += `*Dados do Cliente:*\n`;
    message += `Nome: ${customerInfo.name}\n`;
    message += `Telefone: ${customerInfo.phone}\n\n`;
    
    if (extractedData?.medications?.length > 0) {
      message += `*Medicamentos da Receita:*\n`;
      extractedData.medications.forEach((med, i) => {
        message += `${i + 1}. ${med.name}`;
        if (med.dosage) message += ` - ${med.dosage}`;
        if (med.quantity) message += ` (${med.quantity})`;
        message += `\n`;
      });
    }
    
    if (customerInfo.notes) {
      message += `\n*Observações:*\n${customerInfo.notes}`;
    }
    
    message += `\n\nAguardo o orçamento. Obrigado!`;

    const whatsappNumber = formatWhatsAppNumber(theme.whatsapp);
    if (whatsappNumber) {
      const url = createWhatsAppUrl(whatsappNumber, message);
      if (url) window.open(url, '_blank');
    } else {
      toast.error('WhatsApp não configurado. Configure nas Configurações da farmácia.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enviar Receita Médica</h1>
          <p className="text-gray-500">
            Envie sua receita e receba um orçamento personalizado em minutos
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && <div className={`w-8 h-1 mx-1 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {submitted ? (
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Receita enviada!</h2>
              <p className="text-gray-600 mb-6">Registramos sua receita. Em breve nossa equipe entrará em contato.</p>
              <Button onClick={handleSendToWhatsApp} className="bg-green-600 hover:bg-green-700">
                Abrir WhatsApp
              </Button>
            </CardContent>
          </Card>
        ) : (
        <AnimatePresence mode="wait">
          {/* Step 1: Dados pessoais */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">1. Seus dados</h2>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                      <Input value={customerInfo.name} onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))} placeholder="Seu nome" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp *</label>
                      <Input value={customerInfo.phone} onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))} placeholder="(00) 00000-0000" className="h-12" maxLength={15} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-mail (opcional)</label>
                      <Input type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))} placeholder="seu@email.com" className="h-12" />
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} disabled={!customerInfo.name?.trim() || !customerInfo.phone?.trim()} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
                    Próximo <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Anexar receita */}
          {step === 2 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    2. Anexe a foto ou PDF da receita
                  </h2>

                  {!file ? (
                    <>
                      <label className="block">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,application/pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-600 font-medium mb-2">
                            Clique para enviar ou arraste o arquivo
                          </p>
                          <p className="text-sm text-gray-400">
                            JPG, PNG ou PDF (máx. 10MB)
                          </p>
                        </div>
                      </label>
                      <Button variant="outline" onClick={() => setStep(3)} className="w-full mt-4">Pular (enviar depois)</Button>
                    </>
                  ) : (
                    <div className="space-y-6">
                      {/* Preview */}
                      <div className="relative bg-gray-100 rounded-2xl p-4">
                        {filePreview ? (
                          <img
                            src={filePreview}
                            alt="Receita"
                            className="max-h-80 mx-auto rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center py-12">
                            <FileText className="w-16 h-16 text-gray-400" />
                            <div className="ml-4">
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            setFile(null);
                            setFilePreview(null);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <Button
                        onClick={handleUpload}
                        disabled={isUploading || isAnalyzing}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : isAnalyzing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Analisando receita...
                          </>
                        ) : (
                          <>
                            Próximo
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                  )}

                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>Voltar</Button>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <Camera className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-gray-600">Tire uma foto clara</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <FileText className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-gray-600">Ou envie um PDF</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <Check className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-gray-600">Receba orçamento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Observações */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">3. Dúvidas ou observações (opcional)</h2>
                  <Textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Descreva dúvidas, complementos ou algo que queira informar..."
                    rows={4}
                    className="mb-6"
                  />
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Voltar</Button>
                    <Button onClick={() => setStep(4)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Revisar e enviar <ChevronRight className="w-5 h-5 ml-2" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Revisar e enviar */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">4. Revisar e enviar</h2>
                  <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
                    <p><span className="text-gray-500">Nome:</span> {customerInfo.name}</p>
                    <p><span className="text-gray-500">Telefone:</span> {customerInfo.phone}</p>
                    {customerInfo.email && <p><span className="text-gray-500">E-mail:</span> {customerInfo.email}</p>}
                    {file && <p><span className="text-gray-500">Arquivo:</span> {file.name}</p>}
                    {customerInfo.notes && <p><span className="text-gray-500">Observações:</span> {customerInfo.notes}</p>}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(3)} className="flex-1">Voltar</Button>
                    <Button onClick={handleSubmitPrescription} disabled={isSubmitting} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</> : 'Enviar receita'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        )}

        {/* Info box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Importante</h3>
              <p className="text-sm text-blue-700">
                Medicamentos controlados (tarja preta) exigem a apresentação da receita original 
                no momento da entrega. O receituário será conferido e retido conforme legislação vigente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}